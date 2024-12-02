'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { useLogin } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { type Login, loginSchema } from '@/server/schemas/auth';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export function LoginForm() {
    const { mutate, isPending } = useLogin();

    const form = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        criteriaMode: 'all',
    });

    const t = useTranslations('auth');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(values => mutate(values))} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('labels.email')}</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete='email'
                                    placeholder={t('labels.email_placeholder')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <div className='space-y-2 leading-none'>
                                <div className='space-y-1'>
                                    <FormLabel>{t('labels.password')}</FormLabel>
                                </div>
                                <FormControl>
                                    <PasswordInput
                                        placeholder={t('labels.password_placeholder')}
                                        autoComplete='current-password'
                                        {...field}
                                    />
                                </FormControl>
                                <ErrorMessage
                                    errors={form.formState.errors}
                                    name={field.name}
                                    render={({ messages }) =>
                                        messages &&
                                        Object.entries(messages).map(([type, message]) => (
                                            <p
                                                className='text-sm font-medium text-destructive'
                                                key={type}>
                                                {message}
                                            </p>
                                        ))
                                    }
                                />
                            </div>
                        </FormItem>
                    )}
                />
                <Button className='w-full' type='submit' disabled={isPending}>
                    <Loader2
                        className={cn('size-4 animate-spin', isPending ? 'inline' : 'hidden')}
                    />
                    {t('labels.login')}
                </Button>
            </form>
        </Form>
    );
}
