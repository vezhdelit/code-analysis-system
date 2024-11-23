import { ROUTE_PATH } from '@/constants/routes.constant';
import { verifyHash } from '@/lib/utils.server';
import { lucia } from '@/server/auth';
import { users } from '@/server/db/schema';
import { loginSchema } from '@/server/schemas/auth';
import type { ContextVariables } from '@/server/types';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { and, eq } from 'drizzle-orm';
import { setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { revalidatePath } from 'next/cache';

export const login = new OpenAPIHono<{ Variables: ContextVariables }>().openapi(
    createRoute({
        method: 'post',
        path: '/api/auth/login',
        tags: ['Auth'],
        summary: 'Login',
        description: 'Login user using email and password.',
        request: {
            body: {
                description: 'Request body',
                content: {
                    'application/json': {
                        schema: loginSchema.openapi('Login'),
                    },
                },
                required: true,
            },
        },
        responses: {
            200: {
                description: 'Success',
            },
        },
    }),
    async c => {
        const { email, password } = c.req.valid('json');
        const db = c.get('db');

        const normalizedEmail = email.toUpperCase();

        const existingUser = await db.query.users.findFirst({
            where: and(eq(users.normalizedEmail, normalizedEmail), eq(users.emailVerified, true)),
        });

        if (!existingUser) {
            throw new HTTPException(400, {
                message: 'Authentication failed.',
            });
        }

        const validPassword = await verifyHash(existingUser.hashedPassword, password);
        if (!validPassword) {
            throw new HTTPException(400, {
                message: 'Authentication failed.',
            });
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        setCookie(c, sessionCookie.name, sessionCookie.value, {
            ...sessionCookie.attributes,
            sameSite: 'Strict',
        });

        revalidatePath(ROUTE_PATH.home);

        return c.body(null);
    }
);
