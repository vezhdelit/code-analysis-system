import { HTTP_STATUS_CODES } from '@/enums/server';
import { db } from '@/server/db';
import { codes, projects } from '@/server/db/schema';
import type { AddCodeRoute, GetProjectCodesRoute } from '@/server/routes/codes/codes.routes';
import type { OpenAPIHonoRouteHandler } from '@/server/types';
import { and, eq } from 'drizzle-orm';

export const addCode: OpenAPIHonoRouteHandler<AddCodeRoute> = async c => {
    const { name, content } = c.req.valid('json');
    const { projectId } = c.req.valid('param');

    const user = c.get('user')!;
    const userId = user.id;

    const project = await db.query.projects.findFirst({
        where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    });

    if (!project) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const [code] = await db
        .insert(codes)
        .values({
            name,
            content,
            projectId,
        })
        .returning();

    return c.json(code, HTTP_STATUS_CODES.CREATED);
};

export const getProjectCodes: OpenAPIHonoRouteHandler<GetProjectCodesRoute> = async c => {
    const { projectId } = c.req.valid('param');

    const user = c.get('user')!;
    const userId = user.id;

    const project = await db.query.projects.findFirst({
        where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    });

    if (!project) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const projectCodes = await db.query.codes.findMany({
        where: eq(codes.projectId, projectId),
    });

    return c.json(projectCodes, HTTP_STATUS_CODES.OK);
};
