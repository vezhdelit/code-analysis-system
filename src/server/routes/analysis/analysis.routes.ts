import { HTTP_STATUS_CODES } from '@/enums/server';
import {
    createErrorSchema,
    jsonContent,
    jsonContentRequired,
    notFoundSchema,
} from '@/helpers/route-define';
import {
    analyzeCodeParamsSchema,
    analyzeCodeResponseSchema,
    analyzeCodeSchema,
} from '@/server/schemas/analysis';
import { createRoute } from '@hono/zod-openapi';

const tags = ['Analysis'];

export const analyzeCode = createRoute({
    tags,
    path: '/api/projects/{projectId}/codes/{codeId}/analysis',
    method: 'post',
    request: {
        params: analyzeCodeParamsSchema,
        body: jsonContentRequired(
            analyzeCodeSchema.openapi('Analyze Code', {
                example: {
                    analysisType: 'parse',
                    config: {
                        tolerant: true,
                        comment: true,
                        range: false,
                        loc: false,
                    },
                },
            }),
            'Code analysis data'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(analyzeCodeResponseSchema, 'Updated analysis result'),
        [HTTP_STATUS_CODES.CREATED]: jsonContent(analyzeCodeResponseSchema, 'New analysis result'),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(analyzeCodeSchema),
            'Validation error'
        ),
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Project or code not found'),
    },
});

export const getCodeAnalysisResults = createRoute({
    tags,
    path: '/api/projects/{projectId}/codes/{codeId}/analysis',
    method: 'get',
    request: {
        params: analyzeCodeParamsSchema,
    },
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(analyzeCodeResponseSchema, 'Analysis result'),
        [HTTP_STATUS_CODES.NOT_FOUND]: jsonContent(notFoundSchema, 'Project or code not found'),
    },
});

export type AnalyzeCodeRoute = typeof analyzeCode;
export type GetCodeAnalysisResultsRoute = typeof getCodeAnalysisResults;
