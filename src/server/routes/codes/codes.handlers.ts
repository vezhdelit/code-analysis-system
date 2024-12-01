import { HTTP_STATUS_CODES } from '@/enums/server';
import { db } from '@/server/db';
import { codes, projects } from '@/server/db/schema';
import type {
    AddCodeRoute,
    DeleteCodeRoute,
    GetOneCodeRoute,
    GetProjectCodesRoute,
    UpdateCodeRoute,
} from '@/server/routes/codes/codes.routes';
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

export const updateCode: OpenAPIHonoRouteHandler<UpdateCodeRoute> = async c => {
    const { projectId, codeId } = c.req.valid('param');
    const { name, content } = c.req.valid('json');

    const user = c.get('user')!;
    const userId = user.id;

    const project = await db.query.projects.findFirst({
        where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    });

    if (!project) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const code = await db.query.codes.findFirst({
        where: and(eq(codes.id, codeId), eq(codes.projectId, projectId)),
    });

    if (!code) {
        return c.json({ message: 'Code not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const [updated] = await db
        .update(codes)
        .set({
            name,
            content,
        })
        .where(eq(codes.id, codeId))
        .returning();

    return c.json(updated, HTTP_STATUS_CODES.OK);
};

export const getOneCode: OpenAPIHonoRouteHandler<GetOneCodeRoute> = async c => {
    const { projectId, codeId } = c.req.valid('param');

    const user = c.get('user')!;
    const userId = user.id;

    const project = await db.query.projects.findFirst({
        where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    });

    if (!project) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const code = await db.query.codes.findFirst({
        where: and(eq(codes.id, codeId), eq(codes.projectId, projectId)),
    });

    if (!code) {
        return c.json({ message: 'Code not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    return c.json(code, HTTP_STATUS_CODES.OK);
};

export const deleteCode: OpenAPIHonoRouteHandler<DeleteCodeRoute> = async c => {
    const { projectId, codeId } = c.req.valid('param');

    const user = c.get('user')!;
    const userId = user.id;

    const project = await db.query.projects.findFirst({
        where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
    });
    if (!project) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    const [deleted] = await db
        .delete(codes)
        .where(and(eq(codes.id, codeId), eq(codes.projectId, projectId)))
        .returning();

    if (!deleted) {
        return c.json({ message: 'Code not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }
    return c.body(null, HTTP_STATUS_CODES.NO_CONTENT);
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
        orderBy: (codes, { desc }) => [desc(codes.createdAt)],
    });

    return c.json(projectCodes, HTTP_STATUS_CODES.OK);
};
