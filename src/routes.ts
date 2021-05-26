import { json, Router } from 'express';

import { RepoController } from './controllers/RepoController';
import { UserController } from './controllers/UserController';

const routes = Router();

routes.use(json());

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/repos', RepoController.index);
routes.get('/repos/:id', RepoController.detail);
routes.post('/repos', RepoController.create);
routes.patch('/repos/:id', RepoController.patch);
routes.delete('/repos/:id', RepoController.delete);

export default routes;
