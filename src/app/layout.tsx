import { serverEnvs } from '@/env/server';
import { Providers } from '@/providers/providers';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import '@/styles/globals.css';

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

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en' dir='ltr' suppressHydrationWarning>
            <body
                className={`${inter.variable} ${serverEnvs.NODE_ENV === 'development' ? 'debug-screens' : ''}`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
