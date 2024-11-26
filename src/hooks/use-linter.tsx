import { client } from '@/server/rpc';
import type { ParseCode, ParseCodeResponse } from '@/server/schemas/linter';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useParseCode = () => {
    return useMutation<ParseCodeResponse, Error, ParseCode, unknown>({
        mutationKey: ['parse-code'],
        mutationFn: async json => {
            const response = await client.api.linter.parse.$post({
                json,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
        onSuccess: data => {
            toast.success('Code parsed successfully.');
            return data as ParseCodeResponse;
        },
        onError: () => {
            toast.error('Failed to parse code.');
        },
    });
};
