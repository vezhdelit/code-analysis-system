import { z } from 'zod';

export const tokenizeSchema = z.object({
    code: z.string().min(1),
    config: z
        .object({
            tolerant: z.boolean().optional(),
            comment: z.boolean().optional(),
            range: z.boolean().optional(),
            loc: z.boolean().optional(),
        })
        .optional(),
});

export const tokenizeResponseSchema = z.object({
    tokens: z.array(
        z.object({
            type: z.string(),
            value: z.string(),
        })
    ),
});

export const parseSchema = z.object({
    code: z.string().min(1),
    config: z
        .object({
            tolerant: z.boolean().optional(),
            comment: z.boolean().optional(),
            range: z.boolean().optional(),
            loc: z.boolean().optional(),
        })
        .optional(),
});

export type ParseCode = z.infer<typeof parseSchema>;

export const parseResponseSchema = z.object({
    tokens: z.object({
        type: z.string(),
        sourceType: z.string(),
        body: z.array(
            z.object({
                type: z.string(),
                kind: z.string(),
                declaration: z.array(
                    z.object({
                        type: z.string(),
                        id: z.object({
                            type: z.string(),
                            name: z.string(),
                        }),
                        init: z.object({
                            type: z.string(),
                            value: z.string(),
                            raw: z.string(),
                        }),
                    })
                ),
            })
        ),
    }),
});

export type ParseCodeResponse = z.infer<typeof parseResponseSchema>;
