'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { startTransition } from 'react';
import ReactCountryFlag from 'react-country-flag';

const LANGUAGE_TO_COUNTRY_CODE: Record<string, string> = {
    en: 'GB',
};

const LocaleSelect = () => {
    const locale = useLocale();
    const localeRouter = useRouter();
    const localePathname = usePathname();

    const params = useParams();

    function onSelectValueChange(value: string) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nextLocale = value as any;

        startTransition(() => {
            localeRouter.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname: localePathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <Select onValueChange={onSelectValueChange} defaultValue={locale}>
            <SelectTrigger className='w-[72px]'>
                <SelectValue placeholder='Select language' />
            </SelectTrigger>
            <SelectContent>
                {routing.locales.map(locale => {
                    const countryCode = LANGUAGE_TO_COUNTRY_CODE[locale] || locale;
                    return (
                        <SelectItem key={locale} value={locale}>
                            <ReactCountryFlag
                                countryCode={countryCode}
                                svg
                                style={{
                                    fontSize: '2em',
                                    lineHeight: '2em',
                                    borderRadius: '8px',
                                }}
                                aria-label={locale}
                            />
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export default LocaleSelect;
