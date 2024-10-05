import { AppError } from './base';

export class AppForbiddenError extends AppError {
  status = 403;
  defaultClientMessage = 'Forbidden';
}
