import { hc } from 'hono/client';

import { clientEnvs } from '@/env/client';
import { type AppType } from '@/server';

export const client = hc<AppType>(clientEnvs.NEXT_PUBLIC_BASE_URL);
