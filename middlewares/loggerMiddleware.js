const winston = require("winston");
const expressWinston = require("express-winston");

const requestLoggerMiddleware = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log", maxsize: 1000000 })],
  format: winston.format.json(),
});

const errorLoggerMiddleware = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log", maxsize: 1000000 })],
  format: winston.format.json(),
});

module.exports = { requestLoggerMiddleware, errorLoggerMiddleware };
