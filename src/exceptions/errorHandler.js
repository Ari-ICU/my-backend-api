const AppError = require('./appError');

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const status = err.status || (statusCode >= 500 ? 'error' : 'fail');

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      status: 'fail',
      message: `Invalid ${err.path}: ${err.value}`
    });
  }

  // Handle Mongoose duplicate key error (11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(400).json({
      success: false,
      status: 'fail',
      message: `Duplicate value for ${field}. Please use another value.`
    });
  }

  // Handle Mongoose ValidationError
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors || {}).map(e => e.message);
    return res.status(400).json({
      success: false,
      status: 'fail',
      message: 'Database validation failed',
      errors
    });
  }

  res.status(statusCode).json({
    success: false,
    status: status,
    message: err.message || 'Internal Server Error'
  });
}

module.exports = errorHandler;
