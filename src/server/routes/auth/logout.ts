import { ROUTE_PATH } from '@/constants/routes.constant';
import { lucia } from '@/server/auth';
import type { ContextVariables } from '@/server/types';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { getCookie, setCookie } from 'hono/cookie';

export const logout = new OpenAPIHono<{ Variables: ContextVariables }>().openapi(
    createRoute({
        method: 'get',
        path: '/api/auth/logout',
        tags: ['Auth'],
        summary: 'Logout',
        description: 'Logout user.',
        responses: {
            200: {
                description: 'Success',
            },
        },
    }),
    async c => {
        const sessionId = getCookie(c, lucia.sessionCookieName);

        if (!sessionId) {
            return c.redirect(ROUTE_PATH.login);
        }

        await lucia.invalidateSession(sessionId);
        setCookie(c, lucia.sessionCookieName, '', { expires: new Date(0), sameSite: 'Strict' });
        return c.redirect(ROUTE_PATH.home);
    }
);
