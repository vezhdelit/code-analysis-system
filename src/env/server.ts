import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnvs = createEnv({
    server: {
        NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
        BASE_URL: z.string(),
        POSTGRES_URL: z.string(),

        RESEND_API_KEY: z.string().optional(),

        EMAIL_FROM: z.string(),
        EMAIL_PROVIDER: z.enum(['console', 'resend']),
    },
    experimental__runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});

export type ServerEnvs = typeof serverEnvs;
