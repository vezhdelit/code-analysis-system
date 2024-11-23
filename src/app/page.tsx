import { ClientUser } from '@/components/features/auth/client-user';
import { ThemeToggle } from '@/components/features/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { getUser } from '@/lib/utils.server';
import { AuthProvider } from '@/providers/auth-provider';
import { logout } from '@/server/actions';
import Link from 'next/link';

export default async function Page() {
    const user = await getUser();
    if (!user) {
        return (
            <div className='container flex h-full flex-col items-center justify-center gap-4'>
                <h1 className='text-4xl font-semibold'>Hono x Lucia</h1>
                <ThemeToggle />
                <div className='flex items-center gap-4'>
                    <Button asChild className='w-28'>
                        <Link href={ROUTE_PATH.login}>Login</Link>
                    </Button>
                    <Button asChild className='w-28' variant='outline'>
                        <Link href={ROUTE_PATH.register}>Register</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <AuthProvider user={user}>
            <div className='container flex h-full flex-col items-center justify-center gap-4'>
                <h1 className='text-4xl font-semibold'>Hono x Lucia</h1>
                <ThemeToggle />
                <ClientUser />
                <form action={logout}>
                    <Button>Logout</Button>
                </form>
            </div>
        </AuthProvider>
    );
}
