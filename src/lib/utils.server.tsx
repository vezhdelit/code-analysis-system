import 'server-only';

import { ROUTE_PATH } from '@/constants/routes.constant';
import ConfirmationCode from '@/emails/confirmation-code';
import { serverEnvs } from '@/env/server';
import { lucia } from '@/server/auth';
import { db } from '@/server/db';
import { emailVerificationCodes } from '@/server/db/schema';
import { hash, verify } from '@node-rs/argon2';
import { render } from '@react-email/render';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createDate, isWithinExpirationDate, TimeSpan } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { cache } from 'react';
import { Resend } from 'resend';

export const getUser = cache(async () => {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;
    if (!sessionId) return null;

    const { user } = await lucia.validateSession(sessionId);
    return user;
});

export async function ensureAuthenticated() {
    const user = await getUser();
    if (!user) {
        throw redirect(ROUTE_PATH.login);
    }

    return user;
}

// TODO: This could be injected into the function or have a factory function that returns the appropriate implementation
export async function sendVerificationCode(emailAddress: string, code: string) {
    if (serverEnvs.EMAIL_PROVIDER === 'console') {
        console.info(`Email From: ${serverEnvs.EMAIL_FROM} | Email To: ${emailAddress}`);
        console.info(`Your confirmation code: ${code}`);
        return true;
    } else if (serverEnvs.EMAIL_PROVIDER === 'resend') {
        try {
            const html = await render(<ConfirmationCode validationCode={code} />);

            const resend = new Resend(serverEnvs.RESEND_API_KEY);
            const response = await resend.emails.send({
                from: serverEnvs.EMAIL_FROM,
                to: emailAddress,
                subject: `Your confirmation code: ${code}`,
                html,
                text: `Your confirmation code: ${code}`,
            });
            console.log('response', response);

            return response.error === null;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    return false;
}

export async function generateEmailVerificationCode(userId: string): Promise<string> {
    const existingCode = await db
        .select({ code: emailVerificationCodes.code, expiresAt: emailVerificationCodes.expiresAt })
        .from(emailVerificationCodes)
        .where(eq(emailVerificationCodes.userId, userId));

    if (existingCode.length > 0 && isWithinExpirationDate(existingCode[0]!.expiresAt)) {
        return existingCode[0]!.code;
    }

    const code = generateRandomString(8, alphabet('0-9'));
    if (existingCode.length > 0) {
        await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, userId));
    }

    await db.insert(emailVerificationCodes).values({
        userId,
        code,
        expiresAt: createDate(new TimeSpan(5, 'm')),
    });

    return code;
}

export async function verifyHash(hash: string, password: string) {
    const success = await verify(hash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    return success;
}

export async function hashPassword(password: string) {
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    return passwordHash;
}
