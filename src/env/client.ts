import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const clientEnvs = createEnv({
    client: {
        NEXT_PUBLIC_BASE_URL: z.string(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
    emptyStringAsUndefined: true,
});

export type ClientEnvs = typeof clientEnvs;
