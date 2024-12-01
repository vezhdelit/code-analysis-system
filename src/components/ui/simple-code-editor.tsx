'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export function SimpleCodeEditor({
    code,
    setCode,
}: {
    code: string;
    setCode: (code: string) => void;
}) {
    const lines = code.split('\n');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(event.target.value);
    };

    return (
        <div className='h-[calc(100svh-132px)] w-full rounded-md rounded-tl-none bg-muted px-2 pb-4'>
            <div className='flex h-1 gap-2'>
                <div className='flex min-w-6 select-none flex-col items-center overflow-hidden py-2 text-right font-mono text-sm text-transparent'>
                    {/* last line number*/}
                    {lines.map((_, index) => (
                        <div key={index}>{index + 1}</div>
                    ))}{' '}
                </div>
                <div className='w-full rounded-t-md bg-background'></div>
            </div>
            <ScrollArea className='size-full'>
                <div className='flex h-full gap-2'>
                    <div className='flex min-w-6 select-none flex-col items-center text-right font-mono text-sm text-muted-foreground'>
                        {lines.map((_, index) => (
                            <div key={index}>{index + 1}</div>
                        ))}
                    </div>
                    <Textarea
                        value={code}
                        onKeyDown={e => {
                            if (e.key == 'Tab') {
                                e.preventDefault();
                                const textArea = e.currentTarget;
                                textArea.setRangeText(
                                    '\t',
                                    textArea.selectionStart,
                                    textArea.selectionEnd,
                                    'end'
                                );
                            }
                        }}
                        onChange={handleChange}
                        className='min-h-[calc(100svh-112px)] resize-none rounded-none border-0 p-0 px-2 font-mono focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                </div>
            </ScrollArea>
            <div className='flex h-1 gap-2'>
                <div className='flex min-w-6 select-none flex-col items-center overflow-hidden py-2 text-right font-mono text-sm text-transparent'>
                    {/* last line number*/}
                    {lines.map((_, index) => (
                        <div key={index}>{index + 1}</div>
                    ))}{' '}
                </div>
                <div className='w-full rounded-b-md bg-background'></div>
            </div>
        </div>
    );
}
