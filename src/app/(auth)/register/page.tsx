import { RegisterForm } from '@/components/features/auth/register-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ROUTE_PATH } from '@/constants/routes.constant';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register',
};

export default function RegisterPage() {
    return (
        <div className='flex h-full items-center'>
            <Card className='mx-auto w-[32rem] max-w-lg'>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Welcome!</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <CardFooter className='flex-col items-start gap-2 text-sm'>
                    <div>
                        <span>Already have an account? </span>
                        <Link className='text-blue-600 underline' href={ROUTE_PATH.login}>
                            Login
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
