import { AppError } from './base';

export class AppNotAuthorizedError extends AppError {
  status = 401;
  defaultClientMessage = 'Unauthorized';
}
