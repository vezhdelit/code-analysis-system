import { client } from '@/server/rpc';
import { useQuery } from '@tanstack/react-query';

export const useGetProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await client.api.projects.$get();
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
    });
};
