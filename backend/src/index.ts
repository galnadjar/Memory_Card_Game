import 'dotenv/config';

import { logger } from './logger';
import { startServer } from './server';
import { setup, teardown } from './setup';

async function main() {
  try {
    logger.debug('Setting up server..');
    await setup();
    logger.debug('Setup complete');
    await startServer();
  } catch (err: unknown) {
    logger.error('Critical error, cannot start app');
    logger.error(err as any);
  }
}

main();

process.once('SIGTERM', async () => {
  logger.info('SIGTERM received, tearing down');
  await teardown();
});

process.once('SIGINT', async () => {
  logger.info('SIGINT received, tearing down');
  await teardown();
});
