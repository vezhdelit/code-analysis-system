import { ROUTE_PATH } from '@/constants/routes.constant';
import { HTTP_STATUS_CODES } from '@/enums/server';
import {
    generateEmailVerificationCode,
    hashPassword,
    sendVerificationCode,
    verifyHash,
} from '@/lib/utils.server';
import { lucia } from '@/server/auth';
import { db } from '@/server/db';
import { emailVerificationCodes, users } from '@/server/db/schema';
import type {
    LoginRoute,
    LogoutRoute,
    SendRegistrationCodeRoute,
    VerifyRoute,
} from '@/server/routes/auth/auth.routes';
import type { OpenAPIHonoRouteHandler } from '@/server/types';
import { and, eq } from 'drizzle-orm';
import { getCookie, setCookie } from 'hono/cookie';
import { generateId } from 'lucia';
import { revalidatePath } from 'next/cache';
import { isWithinExpirationDate } from 'oslo';

export const sendRegistrationCode: OpenAPIHonoRouteHandler<SendRegistrationCodeRoute> = async c => {
    const { agree, email } = c.req.valid('json');
    const db = c.get('db');

    if (!agree) {
        return c.json(
            {
                message: 'You must agree to the terms to continue.',
            },
            HTTP_STATUS_CODES.BAD_REQUEST
        );
    }

    const normalizedEmail = email.toUpperCase();

    const existingUser = await db.query.users.findFirst({
        where: eq(users.normalizedEmail, normalizedEmail),
    });

    if (existingUser && existingUser.emailVerified) {
        return c.body(null, HTTP_STATUS_CODES.NO_CONTENT);
    }

    let id: string;
    if (!existingUser) {
        id = generateId(15);
        await db
            .insert(users)
            .values({
                id,
                email: email,
                normalizedEmail,
                agreedToTerms: agree,
            })
            .returning({ insertedUserId: users.id });
    } else {
        id = existingUser.id;
    }

    const code = await generateEmailVerificationCode(id);
    const success = await sendVerificationCode(email, code);

    if (!success) {
        return c.json(
            {
                message: 'Failed to send email.',
            },
            HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
        );
    }

    return c.body(null, HTTP_STATUS_CODES.NO_CONTENT);
};

export const verify: OpenAPIHonoRouteHandler<VerifyRoute> = async c => {
    const { email, confirmationCode, password } = c.req.valid('json');
    const db = c.get('db');

    const normalizedEmail = email.toUpperCase();

    const existingUser = await db.query.users.findFirst({
        where: eq(users.normalizedEmail, normalizedEmail),
        with: {
            emailVerificationCodes: true,
        },
    });

    if (
        !existingUser ||
        existingUser.emailVerified ||
        existingUser.emailVerificationCodes.length <= 0
    ) {
        return c.json(
            {
                message:
                    'Either the user does not exist, the email is already verified or there is no existing user secret.',
            },
            HTTP_STATUS_CODES.BAD_REQUEST
        );
    }

    const code = existingUser.emailVerificationCodes.at(0)!;
    if (!isWithinExpirationDate(code.expiresAt) || code.code !== confirmationCode) {
        return c.json(
            {
                message:
                    'Either the user does not exist, the email is already verified or there is no existing user secret.',
            },
            HTTP_STATUS_CODES.BAD_REQUEST
        );
    }

    const hashedPassword = await hashPassword(password);
    await db.transaction(async ctx => {
        await ctx
            .update(users)
            .set({
                emailVerified: true,
                hashedPassword,
            })
            .where(eq(users.id, existingUser.id));

        await ctx.delete(emailVerificationCodes).where(eq(emailVerificationCodes.id, code.id));
    });

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setCookie(c, sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        sameSite: 'Strict',
    });

    return c.body(null, HTTP_STATUS_CODES.NO_CONTENT);
};

export const login: OpenAPIHonoRouteHandler<LoginRoute> = async c => {
    const { email, password } = c.req.valid('json');

    const normalizedEmail = email.toUpperCase();

    const existingUser = await db.query.users.findFirst({
        where: and(eq(users.normalizedEmail, normalizedEmail), eq(users.emailVerified, true)),
    });

    if (!existingUser) {
        return c.json(
            {
                message: 'Invalid email or password.',
            },
            HTTP_STATUS_CODES.UNAUTHORIZED
        );
    }

    const validPassword = await verifyHash(existingUser.hashedPassword, password);
    if (!validPassword) {
        return c.json(
            {
                message: 'Invalid email or password.',
            },
            HTTP_STATUS_CODES.UNAUTHORIZED
        );
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setCookie(c, sessionCookie.name, sessionCookie.value, {
        ...sessionCookie.attributes,
        sameSite: 'Strict',
    });

    revalidatePath(ROUTE_PATH.home);

    return c.body(null, HTTP_STATUS_CODES.NO_CONTENT);
};

export const logout: OpenAPIHonoRouteHandler<LogoutRoute> = async c => {
    const sessionId = getCookie(c, lucia.sessionCookieName);

    if (!sessionId) {
        return c.redirect(ROUTE_PATH.login);
    }

    await lucia.invalidateSession(sessionId);
    setCookie(c, lucia.sessionCookieName, '', { expires: new Date(0), sameSite: 'Strict' });
    return c.redirect(ROUTE_PATH.home);
};
