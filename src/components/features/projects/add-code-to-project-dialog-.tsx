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
import { useAddCodeToProject } from '@/hooks/use-codes';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';

type Props = {
    projectId: string | number;
};

const AddCodeToProjectDialog = ({ projectId }: Props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [codeSnippetName, setSnippetCodeName] = useState('');

    const addCodeToProject = useAddCodeToProject();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
                <Button
                    className={'size-6 rounded-full'}
                    variant='ghost'
                    size={'sm'}
                    onClick={() => {}}>
                    <GoPlus className='size-5' />
                </Button>
            </DialogTrigger>
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
                <div className='flex flex-col'>
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
                                        content: '//Write your code here',
                                    },
                                })
                                .then(() => {
                                    setIsDialogOpen(false);
                                    setSnippetCodeName('');
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
