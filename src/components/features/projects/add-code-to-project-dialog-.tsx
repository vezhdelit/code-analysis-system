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
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
    projectId: string | number;
    children: React.ReactNode;
};

const AddCodeToProjectDialog = ({ projectId, children }: Props) => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [codeSnippetName, setSnippetCodeName] = useState('');

    const addCodeToProject = useAddCodeToProject();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add code to project{' '}
                        <span className='font-semibold text-accent-foreground/50'>{projectId}</span>
                    </DialogTitle>
                    <DialogDescription>
                        Add a new code to this project. You can analyze your code after adding it.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-2'>
                    <Label>Name</Label>
                    <Input
                        value={codeSnippetName}
                        onChange={e => setSnippetCodeName(e.target.value)}
                        type='text'
                        placeholder='Enter code snippet name'
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'} type='button' className='w-full'>
                            Cancel
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
                                    router.push(
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
                        Add code
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddCodeToProjectDialog;
