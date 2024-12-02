'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password-input';
import { useVerify } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { type Verify, verifySchema } from '@/server/schemas/auth';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export function VerificationForm({ email }: { email: string }) {
    const form = useForm<Verify>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            confirmationCode: '',
            email,
            password: '',
        },
        criteriaMode: 'all',
    });

    const { mutate, isPending } = useVerify();
    const t = useTranslations('auth');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(values => mutate(values))} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <div className='space-y-2 leading-none'>
                                <div className='space-y-1'>
                                    <FormLabel>{t('labels.password')}</FormLabel>
                                    <FormDescription>
                                        {t('labels.choose_strong_password')}
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <PasswordInput
                                        placeholder={t('labels.password_placeholder')}
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
                <FormField
                    control={form.control}
                    name='confirmationCode'
                    render={({ field }) => (
                        <FormItem>
                            <div className='space-y-2 leading-none'>
                                <div className='space-y-1'>
                                    <FormLabel>{t('labels.confirmation_code')}</FormLabel>
                                    <FormDescription>{t('labels.check_email')}</FormDescription>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            {Array.from({ length: 6 }, (_, i) => (
                                                <InputOTPGroup key={i}>
                                                    <InputOTPSlot
                                                        className='size-12 text-base'
                                                        index={i}
                                                    />
                                                </InputOTPGroup>
                                            ))}
                                        </InputOTP>
                                    </FormControl>
                                </div>

                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Button className='w-full' type='submit' disabled={isPending}>
                    <Loader2
                        className={cn('size-4 animate-spin', isPending ? 'inline' : 'hidden')}
                    />
                    {t('labels.continue')}
                </Button>
            </form>
        </Form>
    );
}
