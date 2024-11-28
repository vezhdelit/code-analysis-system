import createHonoApp from '@/server/app';
import { luciaAuth } from '@/server/middlewares/lucia-auth';
import configureOpenAPI from '@/server/open-api';
import analysisRouter from '@/server/routes/analysis/analysis.index';
import authRouter from '@/server/routes/auth/auth.index';
import codesRouter from '@/server/routes/codes/codes.index';
import linterRouter from '@/server/routes/linter/linter.index';
import projectsRouter from '@/server/routes/projects/projects.index';
import secretRouter from '@/server/routes/secret/secret.index';

const app = createHonoApp();
app.use(luciaAuth());

configureOpenAPI(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
    .route('/', authRouter)
    .route('/', linterRouter)
    .use(async (c, next) => {
        const user = c.get('user');
        if (!user) {
            c.status(401);
            return c.body(null);
        }

        return next();
    })
    .route('/', projectsRouter)
    .route('/', codesRouter)
    .route('/', analysisRouter)
    .route('/', secretRouter);

export type HonoAppType = typeof routes;
export default app;
