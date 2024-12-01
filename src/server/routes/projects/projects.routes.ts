import { HTTP_STATUS_CODES } from '@/enums/server';
import {
    createErrorSchema,
    jsonContent,
    jsonContentRequired,
    notFoundSchema,
} from '@/helpers/route-define';
import {
    createProjectResponseSchema,
    createProjectSchema,
    deleteProjectParamsSchema,
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

export const deleteProject = createRoute({
    tags,
    path: '/api/projects/{projectId}',
    method: 'delete',
    request: {
        params: deleteProjectParamsSchema,
    },
    responses: {
        [HTTP_STATUS_CODES.NO_CONTENT]: {
            description: 'Project deleted',
        },
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Project not found'),
    },
});

export type CreateProjectRoute = typeof createProject;
export type GetProjectsRoute = typeof getProjects;
export type DeleteProjectRoute = typeof deleteProject;
