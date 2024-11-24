import { lucia } from '@/server/auth';
import { db } from '@/server/db';
import type { MiddlewareHandler } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';

export function luciaAuth(): MiddlewareHandler {
    return async (c, next) => {
        c.set('db', db);

        const sessionId = getCookie(c, lucia.sessionCookieName);

        if (!sessionId) {
            c.set('user', null);
            c.set('session', null);
            return next();
        }

        const { session, user } = await lucia.validateSession(sessionId);

        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id);
            setCookie(c, lucia.sessionCookieName, sessionCookie.serialize(), {
                ...sessionCookie.attributes,
                sameSite: 'Strict',
            });
        }

        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            setCookie(c, lucia.sessionCookieName, sessionCookie.serialize(), {
                ...sessionCookie.attributes,
                sameSite: 'Strict',
            });
        }

        c.set('user', user);
        c.set('session', session);
        return next();
    };
}
