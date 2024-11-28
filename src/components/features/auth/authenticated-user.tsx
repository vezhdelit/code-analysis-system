'use client';

import { ThemeToggleSidebar } from '@/components/features/theme/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/providers/auth-provider';
import { logout } from '@/server/actions';
import { ChevronsUpDown, LogOut } from 'lucide-react';

export function AuthenticatedUser() {
    const { user } = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2'>
                    <Avatar className='size-8 rounded-lg'>
                        <AvatarImage src={''} alt={''} />
                        <AvatarFallback className='rounded-lg'>👻</AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                        <span className='truncate font-semibold'>{''}</span>
                        <span className='truncate text-xs'>{user.email}</span>
                    </div>
                    <ChevronsUpDown className='ml-auto size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'>
                <DropdownMenuLabel className='p-0 font-normal'>
                    <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                        <Avatar className='size-8 rounded-lg'>
                            <AvatarImage src={''} alt={''} />
                            <AvatarFallback className='rounded-lg'>👻</AvatarFallback>
                        </Avatar>
                        <div className='grid flex-1 text-left text-sm leading-tight'>
                            <span className='truncate font-semibold'>{''}</span>
                            <span className='truncate text-xs'>{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ThemeToggleSidebar />
                <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
