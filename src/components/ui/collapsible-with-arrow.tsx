'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';

type Props = {
    className?: string;
    showArrow?: boolean;
    header: React.ReactNode;
    children: React.ReactNode;
};

const CollapsibleWithArrow = ({ className, header, children, showArrow = true }: Props) => {
    const [open, setOpen] = useState(false);
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <button className={cn(className, 'flex w-full items-center justify-between')}>
                    {header}
                    {showArrow && (
                        <LuChevronRight
                            className={cn('size-6 transition-transform', open ? 'rotate-90' : '')}
                        />
                    )}
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>{children}</CollapsibleContent>
        </Collapsible>
    );
};

export default CollapsibleWithArrow;
