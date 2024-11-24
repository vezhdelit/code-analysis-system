import { HTTP_STATUS_CODES } from '@/enums/server';
import type { SecretRoute } from '@/server/routes/secret/secret.routes';
import type { OpenAPIHonoRouteHandler } from '@/server/types';

export const secret: OpenAPIHonoRouteHandler<SecretRoute> = async c => {
    const user = c.get('user')!;

    return c.json(
        {
            message: 'Secret Message',
            email: user.email,
        },
        HTTP_STATUS_CODES.OK
    );
};
