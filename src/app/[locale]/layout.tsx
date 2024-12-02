import { serverEnvs } from '@/env/server';
import { routing } from '@/i18n/routing';
import { Providers } from '@/providers/providers';
import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

const inter = Inter({
    variable: '--font-sans',
    subsets: ['latin'],
});

export const viewport: Viewport = {
    themeColor: '#4d7cda',
    initialScale: 1.0,
    maximumScale: 1.0,
    minimumScale: 1.0,
    userScalable: false,
    width: 'device-width',
};

export const metadata: Metadata = {
    title: {
        default: 'Hono x Lucia',
        template: '%s',
    },
    keywords: ['hono', 'lucia', 'next.js', 'react'],
    description: 'Hono x Lucia',
    robots: {
        index: true,
        follow: true,
    },
};

export default async function RootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // Ensure that the incoming `locale` is valid
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} dir='ltr' suppressHydrationWarning>
            <body
                className={cn(
                    inter.variable,
                    serverEnvs.NODE_ENV === 'development' ? 'debug-screens' : ''
                )}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        <div className='flex h-screen flex-col'>{children}</div>
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
