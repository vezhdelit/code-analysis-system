import { ClientUser } from '@/components/features/auth/client-user';
import { Logout } from '@/components/features/auth/logout-button';
import { AuthHeader, Header } from '@/components/features/layout/header';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { getUser } from '@/lib/utils.server';
import { AuthProvider } from '@/providers/auth-provider';
import Link from 'next/link';

export default async function Page() {
    const user = await getUser();

    if (!user) {
        return (
            <>
                <Header />

                <main className='container flex flex-1 flex-col items-center justify-center gap-4 overflow-auto'>
                    <h1 className='text-4xl font-semibold'>Hono x Lucia</h1>
                    <div className='flex items-center gap-4'>
                        <Button asChild className='w-28'>
                            <Link href={ROUTE_PATH.login}>Login</Link>
                        </Button>
                        <Button asChild className='w-28' variant='outline'>
                            <Link href={ROUTE_PATH.register}>Register</Link>
                        </Button>
                    </div>
                </main>
            </>
        );
    }

    return (
        <AuthProvider user={user}>
            <AuthHeader />
            <main className='container flex flex-1 flex-col items-center justify-center gap-4'>
                <h1 className='text-4xl font-semibold'>Hono x Lucia</h1>
                <ClientUser />
                <div className='flex items-center gap-4'>
                    <Button asChild className='w-28'>
                        <Link href={ROUTE_PATH.dashboard}>Dashboard</Link>
                    </Button>
                    <Logout>
                        <Button className='w-28' variant='destructive'>
                            Logout
                        </Button>
                    </Logout>
                </div>
            </main>
        </AuthProvider>
    );
}
