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
import { Link as LocaleLink } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { type SendRegistrationCode, sendRegistrationCodeSchema } from '@/server/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
                            <FormDescription>
                                {t('labels.we_will_send_verification')}
                            </FormDescription>
                            <FormControl>
                                <Input placeholder={t('labels.email_placeholder')} {...field} />
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
                                        {t('labels.terms_i_agree')}{' '}
                                        <LocaleLink
                                            href={ROUTE_PATH.terms}
                                            className='text-link underline'>
                                            {t('labels.terms_of_service')}
                                        </LocaleLink>{' '}
                                        {t('labels.terms_and')}{' '}
                                        <LocaleLink
                                            href={ROUTE_PATH.privacy}
                                            className='text-link underline'>
                                            {t('labels.privacy_policy')}
                                        </LocaleLink>
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
                    {t('labels.continue')}
                </Button>
            </form>
        </Form>
    );
}
