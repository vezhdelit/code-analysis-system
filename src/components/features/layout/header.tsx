import { AuthenticatedUser } from '@/components/features/auth/authenticated-user';
import { ThemeToggle } from '@/components/features/theme/theme-toggle';
import { ROUTE_PATH } from '@/constants/routes.constant';
import Link from 'next/link';

export const Header = async () => {
    return (
        <nav className='container flex items-center justify-between p-5'>
            <Link href={ROUTE_PATH.home} className='font-semibold'>
                Hono x Lucia
            </Link>

            <ThemeToggle />
        </nav>
    );
};
export const AuthHeader = async () => {
    return (
        <nav className='container flex items-center justify-between p-5'>
            <Link href={ROUTE_PATH.home} className='font-semibold'>
                Hono x Lucia
            </Link>

            <AuthenticatedUser />
        </nav>
    );
};
