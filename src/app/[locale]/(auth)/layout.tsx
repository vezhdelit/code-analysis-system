import { Header } from '@/components/features/layout/header';
import type { ReactNode } from 'react';

export default async function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
