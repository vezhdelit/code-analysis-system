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
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function CodePage() {
    const params = useParams<{
        project_id: string;
        code_id: string;
    }>();
    const projectId = params.project_id;
    const codeId = params.code_id;

    const { data: code } = useGetOneCode({ projectId, codeId });

    const t = useTranslations('codes');

    const updateCode = useUpdateCode();

    const [content, setContent] = useState('//Write your code here');

    useEffect(() => {
        if (code) {
            setContent(code.content);
        }
    }, [code]);

    return (
        <main className='flex flex-1'>
            <div className='flex w-full gap-5'>
                <div className='relative flex w-full flex-col rounded-lg bg-muted'>
                    <CodesTopbar projectId={projectId} codeId={codeId} />
                    <SimpleCodeEditor code={content} setCode={setContent} />
                    <Button
                        disabled={updateCode.isPending || content === code?.content}
                        className='absolute bottom-4 right-4'
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
                        {t('labels.save_code')}
                    </Button>
                </div>
                <AnalysisBlock projectId={projectId} codeId={codeId} />
            </div>
        </main>
    );
}

interface AnalysisBlockProps {
    projectId: string;
    codeId: string;
}
const AnalysisBlock = ({ projectId, codeId }: AnalysisBlockProps) => {
    const { data: analysisResult } = useGetCodeAnalysisResults({ projectId, codeId });
    const codeAnalysis = useAnalyzeCode();

    const t = useTranslations('analysis');

    const parsedToJsonResult = useMemo(() => {
        if (!analysisResult?.resultData) return null;
        if (typeof analysisResult.resultData === 'object') return analysisResult.resultData;
        try {
            return JSON.parse(analysisResult.resultData);
        } catch (e) {
            return null;
        }
    }, [analysisResult]);

    return (
        <div className='flex w-1/2 flex-col gap-2 rounded-lg bg-muted p-2'>
            <div className='flex items-center justify-between pl-3'>
                <h2 className='text-base font-semibold text-accent-foreground/50'>
                    {t('labels.analysis_results')}
                </h2>
            </div>

            <Button
                disabled={codeAnalysis.isPending}
                onClick={() => {
                    codeAnalysis.mutate({
                        param: { projectId, codeId },
                        json: {
                            analysisType: 'parse',
                            config: {
                                tolerant: true,
                                comment: true,
                                security: true,
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
                {t('labels.analyze')}
            </Button>
            <ScrollArea className='h-[calc(100dvh-208px)] pr-3'>
                <CodeBreakdown analysis={parsedToJsonResult} />
            </ScrollArea>
        </div>
    );
};
