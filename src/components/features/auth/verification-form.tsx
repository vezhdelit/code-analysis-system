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
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password-input';
import { useVerify } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { type Verify, verifySchema } from '@/server/schemas/auth';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(values => mutate(values))} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='confirmationCode'
                    render={({ field }) => (
                        <FormItem>
                            <div className='space-y-2 leading-none'>
                                <div className='space-y-1'>
                                    <FormLabel>Confirmation Code</FormLabel>
                                    <FormDescription>Check your email.</FormDescription>
                                </div>
                                <FormControl>
                                    <InputOTP maxLength={8} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                            <InputOTPSlot index={6} />
                                            <InputOTPSlot index={7} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <div className='space-y-2 leading-none'>
                                <div className='space-y-1'>
                                    <FormLabel>Email</FormLabel>
                                </div>
                                <FormControl>
                                    <Input readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                            </div>
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
                                    <FormLabel>Password</FormLabel>
                                    <FormDescription>Choose a strong password.</FormDescription>
                                </div>
                                <FormControl>
                                    <PasswordInput {...field} />
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
                <Button type='submit' disabled={isPending}>
                    <Loader2
                        className={cn('mr-2 size-4 animate-spin', {
                            [`inline`]: isPending,
                            [`hidden`]: !isPending,
                        })}
                    />
                    Continue
                </Button>
            </form>
        </Form>
    );
}
