import 'express-async-errors';

import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';

import { errorHandler } from './api/middlewares/error-handler';
import { indexRouter } from './api/routes/index';
import { IS_DEV } from './config';

const app = express().disable('etag').disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

if (IS_DEV) {
  app.use(cors());
}

app.use('/api', indexRouter);

app.use(errorHandler());

export { app };
