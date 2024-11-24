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
            agree: false,
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
                        <FormItem className='rounded-md border p-4'>
                            <div className='flex flex-row items-center space-x-3'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className='space-y-1 leading-none'>
                                    <FormDescription>
                                        I agree to the{' '}
                                        <Link
                                            href={ROUTE_PATH.terms}
                                            className='text-link underline'>
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href={ROUTE_PATH.privacy}
                                            className='text-link underline'>
                                            Privacy Policy
                                        </Link>
                                    </FormDescription>
                                </div>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full' type='submit' disabled={isPending}>
                    <Loader2
                        className={cn('size-4 animate-spin', isPending ? 'inline' : 'hidden')}
                    />
                    Continue
                </Button>
            </form>
        </Form>
    );
}
