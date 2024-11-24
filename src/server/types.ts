import type { Session, User } from 'lucia';

import { db } from '@/server/db';
import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';

export type OpenAPIHonoBindings = {
    Variables: ContextVariables;
};

export type OpenAPIHonoApp = OpenAPIHono<OpenAPIHonoBindings>;

export type ContextVariables = {
    db: typeof db;
    user: User | null;
    session: Session | null;
};

export type OpenAPIHonoRouteHandler<R extends RouteConfig> = RouteHandler<R, OpenAPIHonoBindings>;
