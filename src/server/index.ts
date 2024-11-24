import createHonoApp from '@/server/app';
import { luciaAuth } from '@/server/middlewares/lucia-auth';
import configureOpenAPI from '@/server/open-api';
import authRouter from '@/server/routes/auth/auth.index';
import secretRouter from '@/server/routes/secret/secret.index';

const app = createHonoApp();
app.use(luciaAuth());

configureOpenAPI(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
    .route('/', authRouter)
    .use(async (c, next) => {
        const user = c.get('user');
        if (!user) {
            c.status(401);
            return c.body(null);
        }

        return next();
    })
    .route('/', secretRouter);

export type HonoAppType = typeof routes;
export default app;
