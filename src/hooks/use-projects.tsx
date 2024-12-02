import { client } from '@/server/rpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations('projects');
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
            toast.success(t('labels.toast_project_added'));
            return data;
        },
        onError: () => {
            toast.error(t('labels.toast_project_add_failed'));
        },
    });
};

const deleteProject = client.api.projects[':projectId'].$delete;

type DeleteProjectRequestType = InferRequestType<typeof deleteProject>;

export const useDeleteProject = () => {
    const t = useTranslations('projects');
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
            toast.success(t('labels.toast_project_deleted'));
        },
        onError: () => {
            toast.error(t('labels.toast_project_deleted_failed'));
        },
    });
};
