import app from './app';
import logger from './logger';

// simply initalize applicatin
app;

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

