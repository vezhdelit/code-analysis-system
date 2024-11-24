'use client';

import { useAuth } from '@/providers/auth-provider';

export function ClientUser() {
    const { user } = useAuth();
    return <div>Welcome back, {user.email}</div>;
}
