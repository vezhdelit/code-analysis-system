import { clientEnvs } from '@/env/client';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function verifySession() {
    const data = await axios
        .get(`${clientEnvs.NEXT_PUBLIC_BASE_URL}/api/secret`, {
            headers: {
                Cookie: (await cookies()).toString(),
            },
        })
        .then(r => r.data)
        .catch(() => null);
    return data;
}
