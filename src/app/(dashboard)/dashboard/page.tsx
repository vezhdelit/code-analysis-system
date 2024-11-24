import { ClientUser } from '@/components/features/auth/client-user';

export default function DashboardPage() {
    return (
        <main className='container flex flex-1'>
            <ClientUser />;
        </main>
    );
}
