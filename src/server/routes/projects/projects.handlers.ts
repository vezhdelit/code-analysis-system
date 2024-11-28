import { HTTP_STATUS_CODES } from '@/enums/server';
import { db } from '@/server/db';
import { projects } from '@/server/db/schema';
import type {
    CreateProjectRoute,
    GetProjectsRoute,
} from '@/server/routes/projects/projects.routes';
import type { OpenAPIHonoRouteHandler } from '@/server/types';
import { eq } from 'drizzle-orm';

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
    });

    return c.json(userProjects, HTTP_STATUS_CODES.OK);
};
