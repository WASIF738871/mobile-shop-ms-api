/**
 * Unified response utility
 */
const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, statusCode, message, code = 'ERROR', errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
    errors,
  });
};

module.exports = {
  sendResponse,
  sendError,
};
