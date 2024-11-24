import { AuthHeader } from '@/components/features/layout/header';
import { ensureAuthenticated } from '@/lib/utils.server';
import { AuthProvider } from '@/providers/auth-provider';
import type { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const user = await ensureAuthenticated();

    return (
        <AuthProvider user={user}>
            <AuthHeader />
            {children}
        </AuthProvider>
    );
}
