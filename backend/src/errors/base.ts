export class AppError extends Error {
  readonly status: number = 500;
  readonly defaultMessage?: string;

  meta: object;

  constructor();
  constructor(message: string);
  constructor(message: string, meta: object);
  constructor(message?: string, meta: object = {}) {
    super(message);

    this.meta = meta;

    // Easier logging
    Object.defineProperty(this, 'message', { enumerable: true });
    Object.defineProperty(this, 'stack', { enumerable: true });
  }
}
