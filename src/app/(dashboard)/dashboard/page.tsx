'use client';
import ProgramAnalysis from '@/components/features/linter/code-breakdown';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SimpleCodeEditor } from '@/components/ui/simple-code-editor';
import { useParseCode } from '@/hooks/use-linter';
import { cn } from '@/lib/utils';
import type { ParseCodeResponse } from '@/server/schemas/linter';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
    const [code, setCode] = useState('//Write your code here');
    const [result, setResult] = useState<ParseCodeResponse | undefined>(undefined);

    const { mutateAsync, isPending } = useParseCode();

    return (
        <main className='container flex flex-1'>
            <div className='flex w-full gap-5'>
                <SimpleCodeEditor code={code} setCode={setCode} />
                <div className='flex w-1/3 flex-col gap-4'>
                    <Button
                        onClick={async () => {
                            const data = await mutateAsync({
                                code,
                                config: {
                                    tolerant: true,
                                    comment: true,
                                    range: true,
                                    loc: true,
                                },
                            });
                            setResult(data);
                        }}>
                        <Loader2
                            className={cn('size-4 animate-spin', isPending ? 'inline' : 'hidden')}
                        />
                        Analyze
                    </Button>
                    <ScrollArea className='h-[calc(100dvh-148px)] pr-3'>
                        <ProgramAnalysis analysis={result} />
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}
