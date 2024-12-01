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
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const AddProjectDialog = ({ children }: Props) => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [projectName, setProjectName] = useState('');

    const addProject = useAddProject();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new project to workspace</DialogTitle>
                    <DialogDescription>
                        Add a new project to your workspace. You can add codes to this project after
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col space-y-2'>
                    <Label>Name</Label>
                    <Input
                        value={projectName}
                        onChange={e => setProjectName(e.target.value)}
                        type='text'
                        placeholder='Enter project name'
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
                            await addProject
                                .mutateAsync({
                                    json: {
                                        name: projectName,
                                    },
                                })
                                .then(data => {
                                    setIsDialogOpen(false);
                                    setProjectName('');
                                    router.push(`${ROUTE_PATH.projects}/${data.id}`);
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
                        Add project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddProjectDialog;
