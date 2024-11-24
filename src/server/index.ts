import createHonoApp from '@/server/app';
import { luciaAuth } from '@/server/middlewares/lucia-auth';
import configureOpenAPI from '@/server/open-api';
import { authApp } from '@/server/routes/auth';
import { secretApp } from '@/server/routes/secret';

const app = createHonoApp();
app.use(luciaAuth());

configureOpenAPI(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/', authApp).route('/', secretApp);

export type HonoAppType = typeof routes;
export default app;
