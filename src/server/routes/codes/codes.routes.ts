import { HTTP_STATUS_CODES } from '@/enums/server';
import {
    createErrorSchema,
    jsonContent,
    jsonContentRequired,
    notFoundSchema,
} from '@/helpers/route-define';
import {
    addCodeParamsSchema,
    addCodeResponseSchema,
    addCodeSchema,
    getProjectCodesResponseSchema,
} from '@/server/schemas/codes';
import { createRoute } from '@hono/zod-openapi';
const tags = ['Codes'];

export const addCode = createRoute({
    tags,
    path: '/api/projects/{projectId}/codes',
    method: 'post',
    request: {
        params: addCodeParamsSchema,
        body: jsonContentRequired(
            addCodeSchema.openapi('Add Code', {
                example: {
                    name: 'Main Script',
                    content: 'const x = 42;',
                },
            }),
            'Code data'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.CREATED]: jsonContent(addCodeResponseSchema, 'Created code'),
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Project not found'),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(addCodeSchema),
            'Validation error'
        ),
    },
});

export const getProjectCodes = createRoute({
    tags,
    path: '/api/projects/{projectId}/codes',
    method: 'get',
    request: {
        params: addCodeParamsSchema,
    },
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(getProjectCodesResponseSchema, 'List of codes'),
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Project not found'),
    },
});

export type AddCodeRoute = typeof addCode;

export type GetProjectCodesRoute = typeof getProjectCodes;
