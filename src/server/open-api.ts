import { OpenAPIHono } from '@hono/zod-openapi';
import { apiReference } from '@scalar/hono-api-reference';

import type { OpenAPIHonoBindings } from '@/server/types';
import packageJSON from '../../package.json';

export default function configureOpenAPI(app: OpenAPIHono<OpenAPIHonoBindings>) {
    app.doc('/api/openapi/doc', {
        openapi: '3.0.0',
        info: {
            title: 'Hono OpenAPI',
            version: packageJSON.version,
        },
    });

    app.openAPIRegistry.registerComponent('securitySchemes', 'Bearer', {
        type: 'http',
        scheme: 'bearer',
    });

    app.get(
        '/api/docs',
        apiReference({
            theme: 'alternate',
            defaultHttpClient: {
                targetKey: 'javascript',
                clientKey: 'axios',
            },
            spec: {
                url: '/api/openapi/doc',
            },
            layout: 'modern',
        })
    );
}
