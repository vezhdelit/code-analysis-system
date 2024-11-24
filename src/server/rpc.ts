import { hc } from 'hono/client';

import { clientEnvs } from '@/env/client';
import type { HonoAppType } from '@/server';

export const client = hc<HonoAppType>(clientEnvs.NEXT_PUBLIC_BASE_URL);
