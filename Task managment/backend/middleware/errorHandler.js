const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Status: ${statusCode}, Message: ${message}, Stack: ${err.stack}`);
  
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
