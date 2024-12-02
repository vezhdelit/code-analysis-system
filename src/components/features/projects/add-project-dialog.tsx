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
import { useAddProject } from '@/hooks/use-projects';
import { useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const AddProjectDialog = ({ children }: Props) => {
    const localeRouter = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [projectName, setProjectName] = useState('');

    const addProject = useAddProject();

    const t = useTranslations('projects');

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('labels.add_project')}</DialogTitle>
                    <DialogDescription>{t('labels.add_project_description')}</DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-2'>
                    <Label>{t('labels.name')}</Label>
                    <Input
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
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
                            await addProject
                                .mutateAsync({
                                    json: {
                                        name: projectName,
                                    },
                                })
                                .then(data => {
                                    setIsDialogOpen(false);
                                    setProjectName('');
                                    localeRouter.push(`${ROUTE_PATH.projects}/${data.id}`);
                                });
                        }}
                        disabled={!projectName}
                        type='button'
                        className='w-full'>
                        <Loader2
                            className={cn(
                                'size-4 animate-spin',
                                addProject.isPending ? 'inline' : 'hidden'
                            )}
                        />
                        {t('labels.add')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddProjectDialog;
