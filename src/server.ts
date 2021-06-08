import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import routes from './routes';

(async () => {
  const app = express();

  app.use(cors());

  await createConnection();

  app.use(routes);
  app.use('/models', express.static(path.resolve(__dirname, '..', 'models')));

  app.listen(process.env.PORT ?? 3333);
})();
