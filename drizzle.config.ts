import { type Config } from 'drizzle-kit';

import { serverEnvs } from '@/env/server';

export default {
    schema: './src/server/db/schema.ts',
    out: './src/server/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: serverEnvs.POSTGRES_URL,
    },
} satisfies Config;
