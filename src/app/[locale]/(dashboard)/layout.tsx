import { AuthHeader } from '@/components/features/layout/header';
import ProjectsSidebar from '@/components/features/layout/projects-sidebar';
import { ensureAuthenticated } from '@/lib/utils.server';
import { AuthProvider } from '@/providers/auth-provider';
import type { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const user = await ensureAuthenticated();

    return (
        <AuthProvider user={user}>
            <AuthHeader />
            <div className='container flex flex-1 gap-4 pb-4'>
                <ProjectsSidebar />
                {children}
            </div>
        </AuthProvider>
    );
}
