import { client } from '@/server/rpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useGetCodeAnalysisResults = ({
    projectId,
    codeId,
}: {
    projectId: string | number;
    codeId: string | number;
}) => {
    return useQuery({
        queryKey: ['projects', projectId, 'codes', codeId, 'analysis'],
        queryFn: async () => {
            const response = await client.api.projects[':projectId'].codes[':codeId'].analysis.$get(
                {
                    param: { projectId: projectId.toString(), codeId: codeId.toString() },
                }
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
    });
};

const $post = client.api.projects[':projectId'].codes[':codeId'].analysis['$post'];

type AnalyzeCodeResponseType = InferResponseType<typeof $post, 200>;
type AnalyzeCodeRequestType = InferRequestType<typeof $post>;

export const useAnalyzeCode = () => {
    const t = useTranslations('analysis');
    const queryClient = useQueryClient();
    return useMutation<AnalyzeCodeResponseType, Error, AnalyzeCodeRequestType>({
        mutationFn: async request => {
            const response =
                await client.api.projects[':projectId'].codes[':codeId'].analysis.$post(request);

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: [
                    'projects',
                    data.projectId.toString(),
                    'codes',
                    data.codeId.toString(),
                    'analysis',
                ],
            });
            toast.success(t('labels.toast_analysis'));
            return data;
        },
        onError: () => {
            toast.error(t('labels.toast_analysis_failed'));
        },
    });
};
