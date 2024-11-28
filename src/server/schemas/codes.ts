import { z } from 'zod';

export const addCodeSchema = z.object({
    name: z.string().min(1, 'Code name is required'),
    content: z.string().min(1, 'Code content is required'),
});

export const addCodeParamsSchema = z.object({
    projectId: z.coerce.number().openapi({
        param: {
            name: 'projectId',
            in: 'path',
        },
        required: ['projectId'],
        example: 42,
    }),
});

export const addCodeResponseSchema = z.object({
    id: z.number(),
    projectId: z.number(),
    name: z.string(),
    content: z.string(),
    createdAt: z.string(),
});

export const getProjectCodesResponseSchema = z.array(addCodeResponseSchema);
