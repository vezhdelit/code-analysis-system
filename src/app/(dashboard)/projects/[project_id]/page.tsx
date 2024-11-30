import CodesTopbar from '@/components/features/layout/codes-topbar';

interface Props {
    params: Promise<{ project_id: string }>;
}

export default async function ProjectPage({ params }: Props) {
    const { project_id } = await params;
    return (
        <main className='flex flex-1 flex-col items-start justify-center rounded-lg bg-muted'>
            <CodesTopbar projectId={project_id} />
            <div className='flex size-full items-center justify-center'>
                <span className='text-center text-xl font-semibold text-accent-foreground/50'>
                    You choosed an project #{project_id} <br /> Now create an code snippet or choose
                    an existing one
                </span>
            </div>
        </main>
    );
}
