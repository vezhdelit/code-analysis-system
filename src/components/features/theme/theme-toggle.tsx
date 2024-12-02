'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
    const useThemeProps = useTheme();
    const t = useTranslations('theme');

    // https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
    const themeValue = useSyncExternalStore(
        emptySubscribe,
        () => useThemeProps,
        () => null
    );

    if (!themeValue) {
        return (
            <Button variant='ghost' size='sm' className='w-9 px-0'>
                <MoonIcon className='size-5' />
            </Button>
        );
    }

    const { theme, setTheme } = themeValue;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='sm' className='w-9 px-0'>
                    {(theme === 'light' || (theme === 'system' && !systemDark)) && (
                        <SunIcon className='size-5' />
                    )}
                    {(theme === 'dark' || (theme === 'system' && systemDark)) && (
                        <MoonIcon className='size-5' />
                    )}
                    <span className='sr-only'>{t('labels.theme')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <SunIcon className='mr-2 size-4' />
                    <span>{t('labels.light')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <MoonIcon className='mr-2 size-4' />
                    <span>{t('labels.dark')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <LaptopIcon className='mr-2 size-4' />
                    <span>{t('labels.system')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function ThemeToggleSidebar() {
    const useThemeProps = useTheme();
    const t = useTranslations('theme');

    // https://tkdodo.eu/blog/avoiding-hydration-mismatches-with-use-sync-external-store
    const themeValue = useSyncExternalStore(
        emptySubscribe,
        () => useThemeProps,
        () => null
    );

    if (!themeValue) {
        return (
            <DropdownMenuSubTrigger>
                <MoonIcon /> {t('labels.theme')}
            </DropdownMenuSubTrigger>
        );
    }

    const { theme, setTheme } = themeValue;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className='gap-2'>
                {(theme === 'light' || (theme === 'system' && !systemDark)) && (
                    <SunIcon className='size-4' />
                )}
                {(theme === 'dark' || (theme === 'system' && systemDark)) && (
                    <MoonIcon className='size-4' />
                )}
                <span>{t('labels.theme')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                        <DropdownMenuRadioItem className='gap-2' value='light'>
                            <SunIcon className='size-4' />
                            <span>{t('labels.light')}</span>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className='gap-2' value='dark'>
                            <MoonIcon className='size-4' />
                            <span>{t('labels.dark')}</span>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className='gap-2' value='system'>
                            <LaptopIcon className='size-4' />
                            <span>{t('labels.system')}</span>
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
}
