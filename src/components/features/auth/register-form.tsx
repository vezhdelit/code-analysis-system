'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ROUTE_PATH } from '@/constants/routes.constant';
import { useRegister } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { type SendRegistrationCode, sendRegistrationCodeSchema } from '@/server/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function RegisterForm() {
    const { mutate, isPending } = useRegister();
    const form = useForm<SendRegistrationCode>({
        resolver: zodResolver(sendRegistrationCodeSchema),
        defaultValues: {
            email: '',
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(values => mutate(values))} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormDescription>
                                We will send you a verification link at the following email.
                            </FormDescription>
                            <FormControl>
                                <Input placeholder='hey@example.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='agree'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>By checking this box: </FormLabel>
                                <FormDescription>
                                    You are agreeing to our{' '}
                                    <Link
                                        href={ROUTE_PATH.terms}
                                        className='text-blue-600 underline'>
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href={ROUTE_PATH.privacy}
                                        className='text-blue-600 underline'>
                                        Privacy Policy
                                    </Link>
                                    .
                                </FormDescription>
                                <FormMessage />
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
