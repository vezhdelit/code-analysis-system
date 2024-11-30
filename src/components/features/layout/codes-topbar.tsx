'use client';

import AddCodeToProjectDialog from '@/components/features/projects/add-code-to-project-dialog-';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { useGetProjectCodes } from '@/hooks/use-codes';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {
    projectId: string | number;
    codeId?: string | number;
};

const CodesTopbar = ({ projectId, codeId }: Props) => {
    const { data: codes } = useGetProjectCodes({ projectId });

    return (
        <div className='flex items-center gap-2 pt-2'>
            <div className='flex items-center justify-between pl-5'>
                <h2 className='text-base font-semibold text-accent-foreground/50'>
                    Codes {codes?.length ? `(${codes.length})` : ''}
                </h2>
            </div>

            <div className='flex items-center gap-1'>
                {codes?.map(code => (
                    <Button
                        variant='ghost'
                        size={'sm'}
                        key={code.id}
                        className={cn(
                            'h-7',
                            codeId == code.id &&
                                'rounded-none rounded-t-lg bg-background text-primary'
                        )}
                        asChild>
                        <Link href={`${ROUTE_PATH.projects}/${projectId}/codes/${code.id}`}>
                            {code.name}
                        </Link>
                    </Button>
                ))}
                {/* <Button
                    className={'-mt-0.5 size-6 rounded-full'}
                    variant='ghost'
                    size={'sm'}
                    onClick={() => {}}>
                    <GoPlus className='size-5' />
                </Button> */}
                <AddCodeToProjectDialog projectId={projectId} />
            </div>
        </div>
    );
};

export default CodesTopbar;
