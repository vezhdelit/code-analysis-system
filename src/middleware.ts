import { ROUTE_PATH } from '@/constants/routes.constant';
import { verifySession } from '@/lib/utils.middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const data = await verifySession();

    if (!data) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTE_PATH.dashboard, request.url));
}

export const config = {
    matcher: '/',
};
