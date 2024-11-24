'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

export function PasswordInput({
    className,
    ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    ref: React.Ref<HTMLInputElement>;
}) {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className='relative flex'>
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-12', className)}
                {...props}
            />

            <Button
                type='button'
                variant='ghost'
                size='icon'
                className={cn(
                    'absolute right-0 text-sm text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                )}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
        </div>
    );
}
