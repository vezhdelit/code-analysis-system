import { logout } from '@/server/actions';

interface LogoutProps {
    children: React.ReactNode;
}

export function Logout({ children }: LogoutProps) {
    return <form action={logout}>{children}</form>;
}
