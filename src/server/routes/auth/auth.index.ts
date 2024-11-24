import { createRouter } from '@/server/app';
import * as handlers from './auth.handlers';
import * as routes from './auth.routes';

const authRouter = createRouter()
    .openapi(routes.sendRegistrationCode, handlers.sendRegistrationCode)
    .openapi(routes.verify, handlers.verify)
    .openapi(routes.login, handlers.login)
    .openapi(routes.logout, handlers.logout);

export default authRouter;
