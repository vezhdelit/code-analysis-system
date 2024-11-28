import { createRouter } from '@/server/app';
import * as handlers from './projects.handlers';
import * as routes from './projects.routes';

const projectsRouter = createRouter()
    .openapi(routes.createProject, handlers.createProject)
    .openapi(routes.getProjects, handlers.getProjects);

export default projectsRouter;
