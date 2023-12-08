const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const {sequelize} = require('./config/database');

let server;
sequelize.authenticate(

).then(() => {
  logger.info('Database connected');
  // sync local models with database
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
}).catch((error) => {
  logger.error(error);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
