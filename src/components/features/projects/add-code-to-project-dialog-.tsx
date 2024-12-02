'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { useAddCodeToProject } from '@/hooks/use-codes';
import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Props = {
    projectId: string | number;
    children: React.ReactNode;
};

const AddCodeToProjectDialog = ({ projectId, children }: Props) => {
    const localeRouter = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [codeSnippetName, setSnippetCodeName] = useState('');

    const addCodeToProject = useAddCodeToProject();

    const t = useTranslations('codes');

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {t('labels.add_code_to_project')}{' '}
                        <span className='font-semibold text-accent-foreground/50'>{projectId}</span>
                    </DialogTitle>
                    <DialogDescription>
                        {t('labels.add_code_to_project_description')}
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-2'>
                    <Label>{t('labels.name')}</Label>
                    <Input
                        value={codeSnippetName}
                        onChange={e => setSnippetCodeName(e.target.value)}
                        type='text'
                        placeholder={t('labels.name_placeholder')}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'} type='button' className='w-full'>
                            {t('labels.cancel')}
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={async () => {
                            await addCodeToProject
                                .mutateAsync({
                                    param: { projectId: projectId.toString() },
                                    json: {
                                        name: codeSnippetName,
                                        content: '',
                                    },
                                })
                                .then(data => {
                                    setIsDialogOpen(false);
                                    setSnippetCodeName('');
                                    localeRouter.push(
                                        `${ROUTE_PATH.projects}/${projectId}/codes/${data.id}`
                                    );
                                });
                        }}
                        disabled={!codeSnippetName}
                        type='button'
                        className='w-full'>
                        <Loader2
                            className={cn(
                                'size-4 animate-spin',
                                addCodeToProject.isPending ? 'inline' : 'hidden'
                            )}
                        />
                        {t('labels.add_code')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddCodeToProjectDialog;
