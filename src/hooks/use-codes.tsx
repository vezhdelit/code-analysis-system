import { client } from '@/server/rpc';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import { toast } from 'sonner';

export const useGetProjectCodes = ({ projectId }: { projectId: string | number }) => {
    return useQuery({
        queryKey: ['projects', projectId, 'codes'],
        queryFn: async () => {
            const response = await client.api.projects[':projectId'].codes.$get({
                param: { projectId: projectId.toString() },
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
    });
};

export const useGetOneCode = ({
    projectId,
    codeId,
}: {
    projectId: string | number;
    codeId: string | number;
}) => {
    return useQuery({
        queryKey: ['projects', projectId, 'codes', codeId],
        queryFn: async () => {
            const response = await client.api.projects[':projectId'].codes[':codeId'].$get({
                param: { projectId: projectId.toString(), codeId: codeId.toString() },
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
    });
};

const addProjectPost = client.api.projects[':projectId'].codes.$post;

type AddCodeResponseType = InferResponseType<typeof addProjectPost, 201>;
type AddCodeRequestType = InferRequestType<typeof addProjectPost>;

export const useAddCodeToProject = () => {
    const queryClient = useQueryClient();
    return useMutation<AddCodeResponseType, Error, AddCodeRequestType>({
        mutationFn: async request => {
            const response = await client.api.projects[':projectId'].codes.$post(request);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['projects', data.projectId.toString(), 'codes'],
            });
            toast.success('Code added successfully.');
            return data;
        },
        onError: () => {
            toast.error('Failed to add code.');
        },
    });
};

const updateProjectCodePatch = client.api.projects[':projectId'].codes[':codeId'].$patch;

type UpdateCodeResponseType = InferResponseType<typeof updateProjectCodePatch, 200>;
type UpdateCodeRequestType = InferRequestType<typeof updateProjectCodePatch>;

export const useUpdateCode = () => {
    const queryClient = useQueryClient();
    return useMutation<UpdateCodeResponseType, Error, UpdateCodeRequestType>({
        mutationFn: async request => {
            const response =
                await client.api.projects[':projectId'].codes[':codeId'].$patch(request);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['projects', data.projectId.toString(), 'codes'],
            });
            toast.success('Code updated successfully.');
            return data;
        },
        onError: () => {
            toast.error('Failed to update code.');
        },
    });
};

const deleteProjectCodeDelete = client.api.projects[':projectId'].codes[':codeId'].$delete;

type DeleteCodeRequestType = InferRequestType<typeof deleteProjectCodeDelete>;
type DeleteCodeResponseType = {
    projectId: string | number;
    codeId: string | number;
};
export const useDeleteCode = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteCodeResponseType, Error, DeleteCodeRequestType>({
        mutationFn: async request => {
            const response =
                await client.api.projects[':projectId'].codes[':codeId'].$delete(request);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return {
                projectId: request.param.projectId,
                codeId: request.param.codeId,
            };
        },
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['projects', data.projectId.toString(), 'codes'],
            });
            toast.success('Code deleted successfully.');
        },
        onError: () => {
            toast.error('Failed to delete code.');
        },
    });
};
