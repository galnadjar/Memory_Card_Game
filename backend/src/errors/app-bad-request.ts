import { AppError } from './base';

export class AppBadRequestError extends AppError {
  status = 400;
  defaultClientMessage = 'Bad request';
}
