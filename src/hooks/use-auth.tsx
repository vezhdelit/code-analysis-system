import { ROUTE_PATH } from '@/constants/routes.constant';
import { client } from '@/server/rpc';
import type { Login, SendRegistrationCode, Verify } from '@/server/schemas/auth';
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
            toast.success('Verification code sent to your email.');
            router.push(ROUTE_PATH.verify + '?' + new URLSearchParams({ email }).toString());
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
            toast.success('Login successful.');
            router.push(ROUTE_PATH.projects);
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
            toast.success('Registration successful. You are logged in.');
            router.push(ROUTE_PATH.projects);
        },
        onError: () => {
            toast.error('Registration failed. Please try again.');
        },
    });
};
