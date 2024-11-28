import { createRouter } from '@/server/app';
import * as handlers from './codes.handlers';
import * as routes from './codes.routes';

const codesRouter = createRouter()
    .openapi(routes.addCode, handlers.addCode)
    .openapi(routes.getProjectCodes, handlers.getProjectCodes);

export default codesRouter;
