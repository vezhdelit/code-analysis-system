import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from '@/providers/query-provider';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            <ThemeProvider attribute='class'>
                {children}
                <Toaster richColors />
            </ThemeProvider>
        </ReactQueryProvider>
    );
}
