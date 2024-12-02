'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const LeftArrowAnim = dynamic(() => import('@/components/features/projects/left-arrow-anim'), {
    ssr: false,
});

export default function ProjectsPage() {
    const t = useTranslations('projects');
    return (
        <main className='relative flex flex-1 items-center justify-center rounded-lg bg-muted'>
            <LeftArrowAnim className='absolute left-2 top-12 rotate-[195deg] opacity-100' />
            <span className='text-xl font-semibold text-accent-foreground/50'>
                {t('labels.choose_or_create_project')}
            </span>
        </main>
    );
}
