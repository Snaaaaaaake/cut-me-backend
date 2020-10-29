const { ErrorNotFound } = require("../modules/errors");

const notFound = (req, res, next) => {
  next(new ErrorNotFound());
};

const errorHandler = (err, req, res, next) => {
  let incomingError = err;
  if (/Cast to [a-z]+ failed/i.test(incomingError.message)) {
    incomingError = new ErrorNotFound();
  }
  const { message, statusCode = 500 } = incomingError;
  res.status(statusCode).send({ message, statusCode });
};

module.exports = { errorHandler, notFound };
