import { client } from '@/server/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetProjectCodes = ({ projectId }: { projectId: string }) => {
    return useQuery({
        queryKey: ['projects', projectId, 'codes'],
        queryFn: async () => {
            const response = await client.api.projects[':projectId'].codes.$get({
                param: { projectId },
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
    });
};
