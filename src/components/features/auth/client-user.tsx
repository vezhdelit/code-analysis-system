'use client';

import { useAuth } from '@/providers/auth-provider';
import { useTranslations } from 'next-intl';

export function ClientUser() {
    const { user } = useAuth();
    const t = useTranslations('auth');
    return (
        <div>
            {t('labels.welcome_back')}, {user.email}
        </div>
    );
}
