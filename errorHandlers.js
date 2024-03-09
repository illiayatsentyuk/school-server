const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const clientErrorHandler = (err, req, res, next) => {
  res.status(500).send({
    status: 500,
    error: err.message
  });
};

module.exports = { logErrors, clientErrorHandler };
