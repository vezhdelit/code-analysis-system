import { HTTP_STATUS_CODES } from '@/enums/server';
import {
    createErrorSchema,
    jsonContent,
    jsonContentOneOf,
    jsonContentRequired,
    notFoundSchema,
} from '@/helpers/route-define';
import {
    addCodeParamsSchema,
    addCodeResponseSchema,
    addCodeSchema,
    getOneCodeParamsSchema,
    getOneCodeResponseSchema,
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

export const updateCode = createRoute({
    tags,
    path: '/api/projects/{projectId}/codes/{codeId}',
    method: 'patch',
    request: {
        params: getOneCodeParamsSchema,
        body: jsonContentRequired(
            addCodeSchema.openapi('Update Code', {
                example: {
                    name: 'Main Script',
                    content: 'const x = 42;',
                },
            }),
            'Code data'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(addCodeResponseSchema, 'Updated code'),
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Code not found'),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
            [createErrorSchema(getOneCodeParamsSchema), createErrorSchema(addCodeSchema)],
            'The validation error(s)'
        ),
    },
});

export const getOneCode = createRoute({
    tags,
    path: '/api/projects/{projectId}/codes/{codeId}',
    method: 'get',
    request: {
        params: getOneCodeParamsSchema,
    },
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(getOneCodeResponseSchema, 'Code data'),
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Code not found'),
    },
});

export const deleteCode = createRoute({
    tags,
    path: '/api/projects/{projectId}/codes/{codeId}',
    method: 'delete',
    request: {
        params: getOneCodeParamsSchema,
    },
    responses: {
        [HTTP_STATUS_CODES.NO_CONTENT]: {
            description: 'Code deleted',
        },
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Code not found'),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(getOneCodeParamsSchema),
            'Invalid request body'
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
export type UpdateCodeRoute = typeof updateCode;
export type GetOneCodeRoute = typeof getOneCode;
export type DeleteCodeRoute = typeof deleteCode;
export type GetProjectCodesRoute = typeof getProjectCodes;
