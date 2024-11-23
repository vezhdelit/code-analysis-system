'use server';

import { ROUTE_PATH } from '@/constants/routes.constant';
import { lucia } from '@/server/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value;

    if (!sessionId) {
        return redirect(ROUTE_PATH.home);
    }

    await lucia.invalidateSession(sessionId);
    (await cookies()).set(lucia.sessionCookieName, '', {
        expires: new Date(0),
        sameSite: 'strict',
    });
    revalidatePath('/');
    return redirect(ROUTE_PATH.home);
}
