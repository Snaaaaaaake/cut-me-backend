const { ErrorNotFound } = require("../modules/errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  let incomingError = err;
  if (/Cast to [a-z]+ failed/i.test(incomingError.message)) {
    incomingError = new ErrorNotFound();
  }
  const { message, statusCode = 500 } = incomingError;
  res.status(statusCode).send({ message, statusCode });
};

module.exports = { errorHandlerMiddleware };
