import { ROUTE_PATH } from '@/constants/routes.constant';
import { useRouter } from '@/i18n/routing';
import { client } from '@/server/rpc';
import type { Login, SendRegistrationCode, Verify } from '@/server/schemas/auth';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const useRegister = () => {
    const localeRouter = useRouter();
    const t = useTranslations('auth');
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
            toast.success(t('labels.toast_register_code_send'));
            localeRouter.push(ROUTE_PATH.verify + '?' + new URLSearchParams({ email }).toString());
        },
        onError: () => {
            toast.error(t('labels.toast_register_code_send_failed'));
        },
    });
};

export const useLogin = () => {
    const t = useTranslations('auth');
    const localeRouter = useRouter();

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
            toast.success(t('labels.toast_login'));
            localeRouter.push(ROUTE_PATH.projects);
        },
        onError: () => {
            toast.error(t('labels.toast_login_failed'));
        },
    });
};

export const useVerify = () => {
    const localeRouter = useRouter();
    const t = useTranslations('auth');

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
            toast.success(t('labels.toast_verify'));
            localeRouter.push(ROUTE_PATH.projects);
        },
        onError: () => {
            toast.error(t('labels.toast_verify_failed'));
        },
    });
};
