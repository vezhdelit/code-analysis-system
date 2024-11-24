import { HTTP_STATUS_CODES } from '@/enums/server';
import { jsonContent } from '@/helpers/route-define';
import { createRoute, z } from '@hono/zod-openapi';

const tags = ['Secret'];

const secretSchema = z.object({
    message: z.string(),
    email: z.string().email(),
});

export const secret = createRoute({
    tags,
    method: 'get',
    path: '/api/secret',
    summary: 'Shhh...',
    description: '',
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(secretSchema.openapi('SecretResponse'), 'Success'),
    },
});

export type SecretRoute = typeof secret;
