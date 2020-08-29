import { Router } from 'express';

import userRouter from './user.routes';
import sessionRouter from './sessions.routes';
import institutionRouter from './institution.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/institution', institutionRouter);

export default routes;
