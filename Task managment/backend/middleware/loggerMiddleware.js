const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
};

module.exports = requestLogger;
