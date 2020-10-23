const { ErrorNotFound } = require("../modules/errors");

const notFound = (req, res, next) => {
  next(new ErrorNotFound());
};

const errorHandler = (err, req, res, next) => {
  const incomingError = err;
  const { message, statusCode } = incomingError;
  if (/Cast to [a-z]+ failed/i.test(incomingError.message)) {
    incomingError = new ErrorNotFound();
  }
  res.status(statusCode).send({ message, statusCode });
};

module.exports = { errorHandler, notFound };
