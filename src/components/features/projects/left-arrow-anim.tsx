'use client';

import dashedArrowAnim from '@/assets/animations/dashed-arrow-anim.json';
import Lottie from 'lottie-react';

type Props = {
    className?: string;
};

const LeftArrowAnim = ({ className }: Props) => {
    return <Lottie className={className} animationData={dashedArrowAnim} loop={false} />;
};

export default LeftArrowAnim;
