import { client } from '@/server/rpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

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

const addProject = client.api.projects.$post;

type AddProjectResponseType = InferResponseType<typeof addProject, 201>;
type AddProjectRequestType = InferRequestType<typeof addProject>;

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation<AddProjectResponseType, Error, AddProjectRequestType>({
        mutationFn: async request => {
            const response = await client.api.projects.$post(request);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
            toast.success('Code added successfully.');
            return data;
        },
        onError: () => {
            toast.error('Failed to add code.');
        },
    });
};

const deleteProject = client.api.projects[':projectId'].$delete;

type DeleteProjectRequestType = InferRequestType<typeof deleteProject>;

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, DeleteProjectRequestType>({
        mutationFn: async request => {
            const response = await client.api.projects[':projectId'].$delete(request);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return;
        },
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
            toast.success('Code deleted successfully.');
        },
        onError: () => {
            toast.error('Failed to delete code.');
        },
    });
};
