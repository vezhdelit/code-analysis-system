import { z } from 'zod';

export const createProjectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
});

export const createProjectResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string(),
});

export const getProjectsResponseSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        createdAt: z.string(),
    })
);
