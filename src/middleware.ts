import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ua|en)/:path*'],
};

// import { ROUTE_PATH } from '@/constants/routes.constant';
// import { verifySession } from '@/lib/utils.middleware';
// import { NextResponse, type NextRequest } from 'next/server';

// export async function middleware(request: NextRequest) {
//     const data = await verifySession();

//     if (!data) {
//         return NextResponse.next();
//     }
//     return NextResponse.redirect(new URL(ROUTE_PATH.projects, request.url));
// }

// export const config = {
//     matcher: '/',
// };
