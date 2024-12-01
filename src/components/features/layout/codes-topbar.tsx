'use client';

import AddCodeToProjectDialog from '@/components/features/projects/add-code-to-project-dialog-';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { useDeleteCode, useGetProjectCodes } from '@/hooks/use-codes';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { GoPlus, GoX } from 'react-icons/go';

type Props = {
    projectId: string | number;
    codeId?: string | number;
};

const CodesTopbar = ({ projectId, codeId }: Props) => {
    const router = useRouter();
    const { data: codes } = useGetProjectCodes({ projectId });

    const deleteCode = useDeleteCode();

    return (
        <div className='flex items-center gap-2 pt-2'>
            <div className='flex items-center justify-between pl-5'>
                <h2 className='text-base font-semibold leading-3 text-accent-foreground/50'>
                    Code snippets {codes?.length ? `(${codes.length})` : ''}
                </h2>
            </div>

            <div className='flex items-center gap-1'>
                <AddCodeToProjectDialog projectId={projectId}>
                    <Button className={'h-6 gap-0.5 text-xs'} variant='secondary' size={'sm'}>
                        <GoPlus /> New code
                    </Button>
                </AddCodeToProjectDialog>

                {codes?.map(code => (
                    <div key={code.id} className='relative flex items-center'>
                        <Button
                            onClick={() =>
                                router.push(`${ROUTE_PATH.projects}/${projectId}/codes/${code.id}`)
                            }
                            variant='ghost'
                            size={'sm'}
                            className={cn(
                                'h-6',
                                codeId == code.id &&
                                    'h-7 rounded-none rounded-t-lg bg-background text-primary hover:bg-background hover:text-primary'
                            )}>
                            {code.name}
                            <button
                                className='hover:scale-125'
                                onClick={e => {
                                    e.stopPropagation();
                                    deleteCode.mutate({
                                        param: {
                                            projectId: projectId.toString(),
                                            codeId: code.id.toString(),
                                        },
                                    });

                                    router.push(`${ROUTE_PATH.projects}/${projectId}`);
                                }}>
                                <GoX />
                            </button>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodesTopbar;
