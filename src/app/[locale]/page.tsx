import { ClientUser } from '@/components/features/auth/client-user';
import { Logout } from '@/components/features/auth/logout-button';
import { AuthHeader, Header } from '@/components/features/layout/header';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { Link as LocaleLink } from '@/i18n/routing';
import { getUser } from '@/lib/utils.server';
import { AuthProvider } from '@/providers/auth-provider';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
    const user = await getUser();
    const t = await getTranslations();

    if (!user) {
        return (
            <>
                <Header />

                <main className='container flex flex-1 translate-y-[-5%] flex-col items-center justify-center gap-4 overflow-auto'>
                    <h1 className='text-4xl font-semibold'>{t('shared.app_name')}</h1>
                    <div className='flex items-center gap-4'>
                        <Button asChild className='min-w-28'>
                            <LocaleLink href={ROUTE_PATH.login}>
                                {t('auth.labels.login')}
                            </LocaleLink>
                        </Button>
                        <Button asChild className='min-w-28' variant='outline'>
                            <LocaleLink href={ROUTE_PATH.register}>
                                {t('auth.labels.register')}
                            </LocaleLink>
                        </Button>
                    </div>
                </main>
            </>
        );
    }

    return (
        <AuthProvider user={user}>
            <AuthHeader />
            <main className='container flex flex-1 translate-y-[-5%] flex-col items-center justify-center gap-4'>
                <h1 className='text-4xl font-semibold'>{t('shared.app_name')}</h1>
                <ClientUser />
                <div className='flex items-center gap-4'>
                    <Button asChild className='w-28'>
                        <LocaleLink href={ROUTE_PATH.projects}>
                            {t('projects.labels.my_projects')}
                        </LocaleLink>
                    </Button>
                    <Logout>
                        <Button className='w-28' variant='destructive'>
                            {t('auth.labels.logout')}
                        </Button>
                    </Logout>
                </div>
            </main>
        </AuthProvider>
    );
}
