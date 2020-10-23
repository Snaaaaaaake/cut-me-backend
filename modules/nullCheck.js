const { ErrorNotFound } = require("./errors");

module.exports = (data) =>
  data ? Promise.resolve(data) : Promise.reject(new ErrorNotFound());
