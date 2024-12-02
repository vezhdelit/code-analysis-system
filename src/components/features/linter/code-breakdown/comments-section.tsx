'use client';

import CommentItem from '@/components/features/linter/code-breakdown/comment-item';
import CollapsibleWithArrow from '@/components/ui/collapsible-with-arrow';
import { useTranslations } from 'next-intl';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const CommentsSection = ({ comments }: { comments: any }) => {
    const t = useTranslations('analysis');

    if (!comments) return null;
    return (
        <section className='flex flex-col'>
            <CollapsibleWithArrow
                showArrow={comments.length > 0}
                className='text-green-500'
                header={
                    <h2 className='pl-2 text-base font-semibold'>
                        {t('labels.comments')} ({comments.length})
                    </h2>
                }>
                <ul className='space-y-1'>
                    {
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        comments.map((comment: any, index: number) => (
                            <CommentItem key={index} comment={comment} />
                        ))
                    }
                </ul>
            </CollapsibleWithArrow>
        </section>
    );
};

export default CommentsSection;
