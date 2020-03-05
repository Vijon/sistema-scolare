import logger from './logger';
import app from './app';
import ssl from './ssl';

// attach ssl and start to listen
app.configure(ssl);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);
