'use client';
import CodesTopbar from '@/components/features/layout/codes-topbar';
import CodeBreakdown from '@/components/features/linter/code-breakdown';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SimpleCodeEditor } from '@/components/ui/simple-code-editor';
import { useAnalyzeCode, useGetCodeAnalysisResults } from '@/hooks/use-analysis';
import { useGetOneCode, useUpdateCode } from '@/hooks/use-codes';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CodePage() {
    const params = useParams<{
        project_id: string;
        code_id: string;
    }>();
    const projectId = params.project_id;
    const codeId = params.code_id;

    const { data: code } = useGetOneCode({ projectId, codeId });
    const { data: analysisResult } = useGetCodeAnalysisResults({ projectId, codeId });

    const updateCode = useUpdateCode();
    const codeAnalysis = useAnalyzeCode();

    const [content, setContent] = useState('//Write your code here');

    useEffect(() => {
        if (code) {
            setContent(code.content);
        }
    }, [code]);

    return (
        <main className='flex flex-1'>
            <div className='flex w-full gap-5'>
                <div className='flex w-full flex-col rounded-lg bg-muted'>
                    <CodesTopbar projectId={projectId} codeId={codeId} />
                    <SimpleCodeEditor code={content} setCode={setContent} />
                </div>
                <div className='flex w-1/3 flex-col gap-2'>
                    <Button
                        onClick={() => {
                            updateCode.mutate({
                                param: { projectId, codeId },
                                json: {
                                    name: code?.name || '',
                                    content,
                                },
                            });
                        }}>
                        <Loader2
                            className={cn(
                                'size-4 animate-spin',
                                updateCode.isPending ? 'inline' : 'hidden'
                            )}
                        />
                        Save code
                    </Button>
                    <Button
                        disabled={
                            codeAnalysis.isPending ||
                            (code?.content === content && !!analysisResult?.resultData)
                        }
                        onClick={() => {
                            codeAnalysis.mutate({
                                param: { projectId, codeId },
                                json: {
                                    analysisType: 'parse',
                                    config: {
                                        tolerant: true,
                                        comment: true,
                                        range: true,
                                        loc: true,
                                    },
                                },
                            });
                        }}>
                        <Loader2
                            className={cn(
                                'size-4 animate-spin',
                                codeAnalysis.isPending ? 'inline' : 'hidden'
                            )}
                        />
                        Analyze
                    </Button>
                    <ScrollArea className='h-[calc(100dvh-148px)] pr-3'>
                        {analysisResult?.resultData && (
                            <CodeBreakdown analysis={JSON.parse(analysisResult.resultData)} />
                        )}
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}
