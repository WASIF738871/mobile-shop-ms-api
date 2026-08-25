const logger = require('../utils/logger');
const { sendError } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
  logger.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const errors = err.errors || [];

  sendError(res, statusCode, message, code, errors);
};

module.exports = errorMiddleware;
