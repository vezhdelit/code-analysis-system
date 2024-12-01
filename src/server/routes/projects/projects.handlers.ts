import { HTTP_STATUS_CODES } from '@/enums/server';
import { db } from '@/server/db';
import { projects } from '@/server/db/schema';
import type {
    CreateProjectRoute,
    DeleteProjectRoute,
    GetProjectsRoute,
} from '@/server/routes/projects/projects.routes';
import type { OpenAPIHonoRouteHandler } from '@/server/types';
import { and, eq } from 'drizzle-orm';

export const createProject: OpenAPIHonoRouteHandler<CreateProjectRoute> = async c => {
    const { name } = c.req.valid('json');
    const user = c.get('user')!;
    const userId = user.id;

    const [project] = await db
        .insert(projects)
        .values({
            name,
            userId,
        })
        .returning();

    return c.json(project, HTTP_STATUS_CODES.CREATED);
};

export const getProjects: OpenAPIHonoRouteHandler<GetProjectsRoute> = async c => {
    const user = c.get('user')!;
    const userId = user.id;

    const userProjects = await db.query.projects.findMany({
        where: eq(projects.userId, userId),
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return c.json(userProjects, HTTP_STATUS_CODES.OK);
};

export const deleteProject: OpenAPIHonoRouteHandler<DeleteProjectRoute> = async c => {
    const { projectId } = c.req.valid('param');
    const user = c.get('user')!;
    const userId = user.id;

    const [deleted] = await db
        .delete(projects)
        .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
        .returning();

    if (!deleted) {
        return c.json({ message: 'Project not found.' }, HTTP_STATUS_CODES.NOT_FOUND);
    }

    return c.body(null, HTTP_STATUS_CODES.NO_CONTENT);
};
