import { json, Router } from 'express';
import multer from 'multer';
import { multerConfig } from './config/multer';
import { ModelController } from './controllers/ModelController';

import { RepoController } from './controllers/RepoController';
import { UserController } from './controllers/UserController';

const upload = multer(multerConfig);

const routes = Router();

routes.use(json());

routes.get('/users', UserController.index);
routes.get('/users/:email', UserController.detail);
routes.post('/users', UserController.create);

routes.get('/repos', RepoController.index);
routes.get('/repos/:id', RepoController.detail);
routes.post('/repos', RepoController.create);
routes.patch('/repos/:id', RepoController.patch);
routes.delete('/repos/:id', RepoController.delete);

routes.get('/repos/:repoId/models', ModelController.index);
routes.get('/repos/:repoId/models/:id', ModelController.detail);
routes.post('/repos/:repoId/models', upload.single('file'), ModelController.create);
routes.patch('/repos/:repoId/models/:id', ModelController.update);
routes.delete('/repos/:repoId/models/:id', ModelController.delete);

export default routes;
