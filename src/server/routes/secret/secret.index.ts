import { createRouter } from '@/server/app';
import * as handlers from './secret.handlers';
import * as routes from './secret.routes';

const secretRouter = createRouter().openapi(routes.secret, handlers.secret);

export default secretRouter;
