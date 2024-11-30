'use client';

import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants/routes.constant';
import { useGetProjects } from '@/hooks/use-projects';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineFolder } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go';

const ProjectsSidebar = () => {
    const { data: projects } = useGetProjects();
    const pathname = usePathname();

    return (
        <div className='flex min-w-56 flex-col gap-2 rounded-lg bg-muted p-2'>
            <div className='flex items-center justify-between px-3 pt-1'>
                <h2 className='text-base font-semibold text-accent-foreground/50'>
                    Projects {projects?.length ? `(${projects.length})` : ''}
                </h2>
            </div>
            <ul className='flex flex-col gap-1'>
                <Button
                    size={'sm'}
                    variant={'ghost'}
                    className='flex h-8 justify-start gap-1 text-start'>
                    <GoPlus className='size-5' />
                    New project
                </Button>
                {projects?.map(project => {
                    const isActive = pathname.includes(`${ROUTE_PATH.projects}/${project.id}`);
                    return (
                        <Button
                            size={'sm'}
                            variant={isActive ? 'default' : 'ghost'}
                            key={project.id}
                            asChild
                            className={cn(
                                'flex h-8 justify-start gap-1 text-start',
                                isActive && 'bg-primary text-primary-foreground'
                            )}>
                            <Link href={`${ROUTE_PATH.projects}/${project.id}`} className='flex'>
                                <AiOutlineFolder className='size-2' />
                                {project.name}
                            </Link>
                        </Button>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProjectsSidebar;
