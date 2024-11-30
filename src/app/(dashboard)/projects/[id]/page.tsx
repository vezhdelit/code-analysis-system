'use client';
import ProgramAnalysis from '@/components/features/linter/code-breakdown';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SimpleCodeEditor } from '@/components/ui/simple-code-editor';
import { useGetProjectCodes } from '@/hooks/use-codes';
import { useParseCode } from '@/hooks/use-linter';
import { cn } from '@/lib/utils';
import type { ParseCodeResponse } from '@/server/schemas/linter';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';

export default function ProjectPage() {
    const params = useParams<{
        id: string;
    }>();
    const projectId = params.id;

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedCode, setSelectedCode] = useState<any | undefined>(undefined);
    const [code, setCode] = useState('//Write your code here');
    const [result, setResult] = useState<ParseCodeResponse | undefined>(undefined);
    const { data: codes } = useGetProjectCodes({ projectId });
    const { mutateAsync, isPending } = useParseCode();

    return (
        <main className='flex flex-1'>
            <div className='flex w-full gap-5'>
                <div className='flex w-full flex-col'>
                    <div className='flex'>
                        {codes?.map(code => (
                            <Button
                                variant='ghost'
                                size={'sm'}
                                key={code.id}
                                className={cn(
                                    selectedCode?.id === code.id &&
                                        'rounded-none rounded-t-lg bg-muted'
                                )}
                                onClick={() => {
                                    setCode(code.content);
                                    setSelectedCode(code);
                                }}>
                                {code.name}
                            </Button>
                        ))}
                        <Button
                            variant='ghost'
                            size={'sm'}
                            onClick={() => {
                                setCode('//Write your code here');
                                setSelectedCode(undefined);
                            }}>
                            <GoPlus className='size-5' />
                        </Button>
                    </div>
                    <SimpleCodeEditor code={code} setCode={setCode} />
                </div>
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
