import { AuthenticatedUser } from '@/components/features/auth/authenticated-user';
import { ThemeToggle } from '@/components/features/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import Link from 'next/link';

export const Header = async () => {
    return (
        <nav className='container flex items-center justify-between p-5'>
            <Link href={ROUTE_PATH.home} className='font-semibold'>
                Hono x Lucia
            </Link>

            <Link href={ROUTE_PATH.docs} className='font-semibold'>
                API
            </Link>

            <div className='flex items-center gap-5'>
                <Button variant={'link'} asChild>
                    <Link href={ROUTE_PATH.docs} className='font-semibold'>
                        API
                    </Link>
                </Button>

                <ThemeToggle />
            </div>
        </nav>
    );
};
export const AuthHeader = async () => {
    return (
        <nav className='container flex items-center justify-between p-5'>
            <Link href={ROUTE_PATH.home} className='font-semibold'>
                Hono x Lucia
            </Link>

            <div className='flex items-center gap-5'>
                <Button variant={'link'} asChild>
                    <Link href={ROUTE_PATH.docs} className='font-semibold'>
                        API
                    </Link>
                </Button>

                <AuthenticatedUser />
            </div>
        </nav>
    );
};
