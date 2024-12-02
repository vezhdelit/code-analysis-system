'use client';

import dashedArrowAnim from '@/assets/animations/dashed-arrow-anim.json';
import CodesTopbar from '@/components/features/layout/codes-topbar';
import Lottie from 'lottie-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function ProjectPage() {
    const params = useParams<{
        project_id: string;
        code_id: string;
    }>();
    const projectId = params.project_id;

    const t = useTranslations('codes');

    return (
        <main className='flex flex-1 flex-col items-start justify-center rounded-lg bg-muted'>
            <CodesTopbar projectId={projectId} />
            <div className='relative flex size-full items-center justify-center'>
                <Lottie
                    className='absolute left-32 top-8 rotate-[80deg] -scale-x-100 opacity-100'
                    animationData={dashedArrowAnim}
                    loop={false}
                />
                <span className='text-center text-xl font-semibold text-accent-foreground/50'>
                    {t('labels.choose_or_create_code')}
                </span>
            </div>
        </main>
    );
}
