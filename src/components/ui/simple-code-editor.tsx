'use client';

import Editor, { loader } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function SimpleCodeEditor({
    code,
    setCode,
}: {
    code: string;
    setCode: (code: string) => void;
}) {
    const { theme } = useTheme();

    useEffect(() => {
        loader.init().then(monaco => {
            monaco.editor.defineTheme('my-dark', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#131416',
                },
            });

            monaco.editor.defineTheme('my-light', {
                base: 'vs',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#f1f5f9',
                },
            });
        });
    }, []);

    return (
        <div className='h-[calc(100svh-132px)] w-full rounded-md rounded-tl-none bg-muted px-2 pb-2'>
            {/* <div className='flex h-1 gap-2'>
                <div className='flex min-w-6 select-none flex-col items-center overflow-hidden py-2 text-right font-mono text-sm text-transparent'>
                    {lines.map((_, index) => (
                        <div key={index}>{index + 1}</div>
                    ))}{' '}
                </div>
                <div className='w-full rounded-t-md bg-background'></div>
            </div> */}
            <Editor
                value={code}
                onChange={value => {
                    if (!value) return;
                    setCode(value);
                }}
                theme={theme === 'dark' ? 'my-dark' : 'my-light'}
                className='rounded-lg'
                defaultLanguage='javascript'
                defaultValue='// some comment'
                options={{
                    minimap: { enabled: false },
                    scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
                    padding: { top: 10, bottom: 10 },
                    overviewRulerBorder: false,
                    overviewRulerLanes: 0,
                }}
            />
            {/* 
            <ScrollArea className='size-full'>
                <div className='flex h-full gap-2'>
                    <div className='flex min-w-6 select-none flex-col items-center text-right font-mono text-sm text-muted-foreground'>
                        {lines.map((_, index) => (
                            <div key={index}>{index + 1}</div>
                        ))}
                    </div>
                    <Textarea
                        spellCheck={false}
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
            </ScrollArea> */}
            {/* <div className='flex h-1 gap-2'>
                <div className='flex min-w-6 select-none flex-col items-center overflow-hidden py-2 text-right font-mono text-sm text-transparent'>
                    {lines.map((_, index) => (
                        <div key={index}>{index + 1}</div>
                    ))}{' '}
                </div>
                <div className='w-full rounded-b-md bg-background'></div>
            </div> */}
        </div>
    );
}
