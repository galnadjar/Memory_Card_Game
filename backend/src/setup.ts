import mongoose from 'mongoose';

import { MONGO_DB, MONGO_HOST, MONGO_PASSWORD, MONGO_USERNAME } from './config';
import { logger } from './logger';

mongoose.connection.on('open', () => logger.info('MongoDb Connected'));
mongoose.connection.on('disconnected', () => logger.error('MongoDb Disconnected'));

export const setup = async () => {
  logger.debug('Connecting to DB...');
  await mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`);
  logger.debug('Connected to DB');
};

export const teardown = async () => {
  await mongoose.disconnect();
};
