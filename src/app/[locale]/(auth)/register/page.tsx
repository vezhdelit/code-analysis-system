import { RegisterForm } from '@/components/features/auth/register-form';
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
    title: 'Register',
    description: 'Register',
};

export default async function RegisterPage() {
    const t = await getTranslations('auth');

    return (
        <div className='flex h-full items-center'>
            <Card className='mx-auto w-[28rem] max-w-lg'>
                <CardHeader>
                    <CardTitle>{t('labels.register')}</CardTitle>
                    <CardDescription>{t('labels.welcome')}!</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter className='flex-col items-center gap-2 text-sm'>
                    <div>
                        <span>{t('labels.already_registered')} </span>
                        <LocaleLink className='text-link underline' href={ROUTE_PATH.login}>
                            {t('labels.login')}
                        </LocaleLink>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
