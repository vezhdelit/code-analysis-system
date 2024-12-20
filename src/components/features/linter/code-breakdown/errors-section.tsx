'use client';

import ErrorItem from '@/components/features/linter/code-breakdown/error-item';
import CollapsibleWithArrow from '@/components/ui/collapsible-with-arrow';
import { useTranslations } from 'next-intl';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorSection = ({ errors }: { errors: any }) => {
    const t = useTranslations('analysis');

    if (!errors) return null;
    return (
        <section className='flex flex-col'>
            <CollapsibleWithArrow
                showArrow={errors.length > 0}
                className='text-red-500'
                header={
                    <h2 className='pl-2 text-base font-semibold'>
                        {t('labels.errors')} ({errors.length})
                    </h2>
                }>
                <ul className='space-y-1'>
                    {
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        errors.map((error: any, index: number) => (
                            <ErrorItem key={index} error={error} />
                        ))
                    }
                </ul>
            </CollapsibleWithArrow>
        </section>
    );
};

export default ErrorSection;
