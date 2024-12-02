import { LoginForm } from '@/components/features/auth/login-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { Link as LocaleLink } from '@/i18n/routing';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Welcome back!',
};

export default async function LoginPage() {
    const t = await getTranslations('auth');

    return (
        <div className='flex h-full items-center'>
            <Card className='mx-auto w-[28rem] max-w-lg'>
                <CardHeader>
                    <CardTitle>{t('labels.login')}</CardTitle>
                    <CardDescription>{t('labels.welcome_back')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter className='flex-col items-center gap-2 text-sm'>
                    <div>
                        <span>{t('labels.dont_have_account')}</span>
                        <LocaleLink className='text-link underline' href={ROUTE_PATH.register}>
                            {t('labels.create_one')}
                        </LocaleLink>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
