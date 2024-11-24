import { HTTP_STATUS_CODES } from '@/enums/server';
import { createErrorSchema, jsonContent, jsonContentRequired } from '@/helpers/route-define';
import { loginSchema, sendRegistrationCodeSchema, verifySchema } from '@/server/schemas/auth';
import { createRoute } from '@hono/zod-openapi';

const tags = ['Auth'];

export const sendRegistrationCode = createRoute({
    tags,
    method: 'post',
    path: '/api/auth/register/send-registration-code',
    summary: 'Start Registration',
    description: 'Emails the user a temporary registration code',
    request: {
        body: jsonContentRequired(
            sendRegistrationCodeSchema.openapi('SendRegistrationCode', {
                example: {
                    email: 'hey@example.com',
                    agree: true,
                },
            }),
            'Request body'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.NO_CONTENT]: {
            description: 'Success',
        },
        [HTTP_STATUS_CODES.BAD_REQUEST]: jsonContent(
            createErrorSchema(sendRegistrationCodeSchema),
            'You must agree to the terms to continue.'
        ),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(sendRegistrationCodeSchema),
            'Invalid request body'
        ),
        [HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR]: jsonContent(
            createErrorSchema(sendRegistrationCodeSchema),
            'Failed to send registration code'
        ),
    },
});

export const verify = createRoute({
    tags,
    method: 'post',
    path: '/api/auth/register/verify',
    summary: 'Verify Registration',
    description: 'Verifies the confirmation code and stores the password hash.',
    request: {
        body: jsonContentRequired(
            verifySchema.openapi('Verify', {
                example: {
                    email: 'hey@example.com',
                    confirmationCode: '42424242',
                    password: '11eeb60bbef14eb5b8990c02cdb11851',
                },
            }),
            'Request body'
        ),
    },
    responses: {
        [HTTP_STATUS_CODES.NO_CONTENT]: {
            description: 'Success',
        },
        [HTTP_STATUS_CODES.BAD_REQUEST]: jsonContent(
            createErrorSchema(verifySchema),
            'Invalid request body'
        ),
    },
});

export const login = createRoute({
    tags,
    method: 'post',
    path: '/api/auth/login',
    summary: 'Login',
    description: 'Login user using email and password.',
    request: {
        body: jsonContentRequired(loginSchema.openapi('Login'), 'Login credentials'),
    },
    responses: {
        [HTTP_STATUS_CODES.NO_CONTENT]: {
            description: 'Success',
        },
        [HTTP_STATUS_CODES.UNAUTHORIZED]: jsonContent(
            createErrorSchema(loginSchema),
            'Wrong password or email'
        ),
        [HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(loginSchema),
            'Invalid login credentials'
        ),
    },
});

export const logout = createRoute({
    tags,
    method: 'get',
    path: '/api/auth/logout',
    summary: 'Logout',
    description: 'Logout user.',
    responses: {
        [HTTP_STATUS_CODES.OK]: {
            description: 'Success',
        },
    },
});

export type SendRegistrationCodeRoute = typeof sendRegistrationCode;
export type VerifyRoute = typeof verify;
export type LoginRoute = typeof login;
export type LogoutRoute = typeof logout;
