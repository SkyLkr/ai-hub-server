import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';

import routes from './routes';

(async () => {
  const app = express();

  app.use(cors());

  await createConnection();

  app.use(routes);

  app.listen(process.env.PORT ?? 3333);
})();
