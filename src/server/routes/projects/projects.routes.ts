import { HTTP_STATUS_CODES } from '@/enums/server';
import { createErrorSchema, jsonContent, jsonContentRequired } from '@/helpers/route-define';
import {
    createProjectResponseSchema,
    createProjectSchema,
    getProjectsResponseSchema,
} from '@/server/schemas/projects';
import { createRoute } from '@hono/zod-openapi';

const tags = ['Projects'];

export const createProject = createRoute({
    tags,
    path: '/api/projects',
    method: 'post',
    request: {
        body: jsonContentRequired(
            createProjectSchema.openapi('Create Project', {
                example: {
                    name: 'My First Project',
                },
            }),
            'Create Project'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.CREATED]: jsonContent(createProjectResponseSchema, 'Created project'),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(createProjectSchema),
            'Validation error'
        ),
    },
});

export const getProjects = createRoute({
    tags,
    path: '/api/projects',
    method: 'get',
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(getProjectsResponseSchema, 'List of projects'),
    },
});

export type CreateProjectRoute = typeof createProject;
export type GetProjectsRoute = typeof getProjects;
