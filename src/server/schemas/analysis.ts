import { z } from 'zod';

const configSchema = z.object({
    tolerant: z.boolean().optional(),
    comment: z.boolean().optional(),
    security: z.boolean().optional(),
    range: z.boolean().optional(),
    loc: z.boolean().optional(),
});

export const analyzeCodeSchema = z.object({
    analysisType: z.enum(['tokenize', 'parse']).openapi('Analysis type', {
        example: 'tokenize',
    }),
    config: configSchema.optional(),
});

export const analyzeCodeParamsSchema = z.object({
    projectId: z.coerce.number().openapi({
        param: {
            name: 'projectId',
            in: 'path',
        },
        required: ['projectId'],
        example: 42,
    }),
    codeId: z.coerce.number().openapi({
        param: {
            name: 'codeId',
            in: 'path',
        },
        required: ['codeId'],
        example: 42,
    }),
});

export const analyzeCodeResponseSchema = z.object({
    id: z.number(),
    codeId: z.number(),
    projectId: z.number(),
    analysisType: z.string(),
    resultData: z.any(),
    createdAt: z.string(),
});
