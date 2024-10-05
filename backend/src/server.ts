/* eslint-disable no-fallthrough */
import http from 'http';

import { app } from './app';
import { port } from './config';
import { logger } from './logger';

// Default onError
const onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`port requires elevated privileges. error - ${error}. bind - ${bind}`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`port is already in use.  error - ${error}. bind - ${bind}`);
      process.exit(1);
    default:
      throw error;
  }
};

export const startServer = async () =>
  await new Promise<void>((resolve) => {
    app.set('port', port);
    const server = http.createServer(app);

    server.on('error', onError);
    server.on('listening', () => {
      logger.info(`Listening on port ${port} 🚀`);
      resolve();
    });

    server.listen(port);
  });
