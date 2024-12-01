'use client';

import AddProjectDialog from '@/components/features/projects/add-project-dialog';
import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { useDeleteProject, useGetProjects } from '@/hooks/use-projects';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineFolder } from 'react-icons/ai';
import { GoPlus, GoX } from 'react-icons/go';

const ProjectsSidebar = () => {
    const router = useRouter();

    const { data: projects } = useGetProjects();
    const pathname = usePathname();

    const deleteProject = useDeleteProject();

    return (
        <div className='flex min-w-56 flex-col gap-2 rounded-lg bg-muted p-2'>
            <div className='flex items-center justify-between px-3 pt-1'>
                <h2 className='text-base font-semibold text-accent-foreground/50'>
                    Projects {projects?.length ? `(${projects.length})` : ''}
                </h2>
            </div>
            <ul className='flex flex-col gap-1'>
                <AddProjectDialog>
                    <Button
                        size={'sm'}
                        variant={'secondary'}
                        className='flex h-8 w-full justify-start gap-1 text-start'>
                        <GoPlus className='size-5' />
                        New project
                    </Button>
                </AddProjectDialog>
                {projects?.map(project => {
                    const isActive = pathname.includes(`${ROUTE_PATH.projects}/${project.id}`);
                    return (
                        <Button
                            onClick={() => router.push(`${ROUTE_PATH.projects}/${project.id}`)}
                            size={'sm'}
                            variant={isActive ? 'default' : 'ghost'}
                            key={project.id}
                            className={cn(
                                'group flex h-8 justify-between gap-1 text-start',
                                isActive && 'bg-primary text-primary-foreground'
                            )}>
                            <div className='flex items-center gap-1'>
                                <AiOutlineFolder className='size-2' />
                                {project.name}
                            </div>

                            <button
                                className='hidden transition-all hover:scale-125 group-hover:flex'
                                onClick={e => {
                                    e.stopPropagation();
                                    deleteProject.mutate({
                                        param: {
                                            projectId: project.id.toString(),
                                        },
                                    });

                                    router.push(`${ROUTE_PATH.projects}`);
                                }}>
                                <GoX />
                            </button>
                        </Button>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProjectsSidebar;
