import { Routes } from '@/lib/routes';
import type { Login, SendRegistrationCode, Verify } from '@/schemas/auth';
import { client } from '@/server/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useRegister = () => {
    const router = useRouter();
    return useMutation<unknown, Error, SendRegistrationCode, unknown>({
        mutationKey: ['register'],
        mutationFn: async input => {
            const response = await client.api.auth.register['send-registration-code'].$post({
                json: input,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return { email: input.email };
        },
        onSuccess: (_, { email }) => {
            router.push(
                Routes.verify(undefined, {
                    search: {
                        email,
                    },
                })
            );
        },
        onError: () => {
            toast.error('Failed to send verification code');
        },
    });
};

export const useLogin = () => {
    const router = useRouter();

    return useMutation<unknown, Error, Login, unknown>({
        mutationKey: ['login'],
        mutationFn: async json => {
            const response = await client.api.auth.login.$post({
                json,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        },
        onSuccess: async () => {
            router.push(Routes.home());
        },
        onError: () => {
            toast.error('Login failed.');
        },
    });
};

export const useVerify = () => {
    const router = useRouter();
    return useMutation<unknown, Error, Verify>({
        mutationKey: ['user-verification'],
        mutationFn: async json => {
            const response = await client.api.auth.register.verify.$post({
                json,
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
        },
        onSuccess: () => {
            router.push(Routes.home());
        },
        onError: () => {
            toast.error('Registration failed. Please try again.');
        },
    });
};
