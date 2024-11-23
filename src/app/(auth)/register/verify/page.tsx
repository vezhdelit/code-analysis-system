import { VerificationForm } from '@/components/features/auth/verification-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTE_PATH } from '@/constants/routes.constant';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Verify Your Email',
    description: 'Almost there!',
};

export default async function VerifyPage(props: {
    searchParams: Promise<{ email: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;

    const { email } = searchParams;

    if (!email || Array.isArray(email)) {
        return redirect(ROUTE_PATH.register);
    }

    return (
        <div className='flex h-full items-center'>
            <Card className='mx-auto w-[32rem] max-w-lg'>
                <CardHeader>
                    <CardTitle>Verify Your Email</CardTitle>
                    <CardDescription>Almost there!</CardDescription>
                </CardHeader>
                <CardContent>
                    <VerificationForm email={email} />
                </CardContent>
            </Card>
        </div>
    );
}
