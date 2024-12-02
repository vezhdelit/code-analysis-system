import { AuthenticatedUser } from '@/components/features/auth/authenticated-user';
import LocaleSelect from '@/components/features/locale/locale-select';
import { ThemeToggle } from '@/components/features/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { Link as LocaleLink } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const Header = () => {
    const t = useTranslations('shared');

    return (
        <nav className='container flex items-center justify-between p-5'>
            <LocaleLink href={ROUTE_PATH.home} className='font-semibold'>
                {t('app_name')}
            </LocaleLink>

            <div className='flex items-center gap-5'>
                <Button variant={'link'} asChild>
                    <Link href={ROUTE_PATH.docs} className='font-semibold'>
                        {t('buttons.api')}
                    </Link>
                </Button>

                <LocaleSelect />

                <ThemeToggle />
            </div>
        </nav>
    );
};
export const AuthHeader = () => {
    const t = useTranslations('shared');

    return (
        <nav className='container flex items-center justify-between p-5'>
            <LocaleLink href={ROUTE_PATH.home} className='font-semibold'>
                {t('app_name')}
            </LocaleLink>

            <div className='flex items-center gap-5'>
                <Button variant={'link'} asChild>
                    <Link href={ROUTE_PATH.docs} className='font-semibold'>
                        {t('buttons.api')}
                    </Link>
                </Button>

                <LocaleSelect />

                <AuthenticatedUser />
            </div>
        </nav>
    );
};
