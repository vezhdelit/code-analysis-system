import dashedArrowAnim from '@/assets/animations/dashed-arrow-anim.json';
import Lottie from 'lottie-react';

export default function ProjectsPage() {
    return (
        <main className='relative flex flex-1 items-center justify-center rounded-lg bg-muted'>
            <Lottie
                className='absolute left-2 top-12 rotate-[195deg] opacity-100'
                animationData={dashedArrowAnim}
                loop={false}
            />
            <span className='text-xl font-semibold text-accent-foreground/50'>
                Choose or create a project to get started
            </span>
        </main>
    );
}
