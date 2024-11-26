import { HTTP_STATUS_CODES } from '@/enums/server';
import { createErrorSchema, jsonContent, jsonContentRequired } from '@/helpers/route-define';
import {
    parseResponseSchema,
    parseSchema,
    tokenizeResponseSchema,
    tokenizeSchema,
} from '@/server/schemas/linter';
import { createRoute } from '@hono/zod-openapi';

const tags = ['Linter'];

export const tokenizeCode = createRoute({
    tags,
    path: '/api/linter/tokenize',
    method: 'post',
    request: {
        body: jsonContentRequired(
            tokenizeSchema.openapi('Code to tokenize', {
                example: {
                    code: 'const x = 1;',
                    config: {
                        tolerant: true,
                        comment: false,
                        range: false,
                        loc: false,
                    },
                },
            }),
            'Code to tokenize'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(tokenizeResponseSchema, 'Tokenized code'),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(tokenizeSchema),
            'Validation error'
        ),
    },
});

export const parseCode = createRoute({
    tags,
    path: '/api/linter/parse',
    method: 'post',
    request: {
        body: jsonContentRequired(
            parseSchema.openapi('Code to parse', {
                example: {
                    code: 'const x = 1;',
                    config: {
                        tolerant: true,
                        comment: false,
                        range: false,
                        loc: false,
                    },
                },
            }),
            'Code to parse'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.OK]: jsonContent(parseResponseSchema, 'Parsed code'),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(parseSchema),
            'Validation error'
        ),
    },
});

export type TokenizeCodeRoute = typeof tokenizeCode;
export type ParseCodeRoute = typeof parseCode;
