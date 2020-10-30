class ErrorUnauthorized extends Error {
  constructor(message = "Необходима авторизация") {
    super(message);
    this.statusCode = 401;
  }
}
class ErrorNotFound extends Error {
  constructor(message = "Ничего не найдено") {
    super(message);
    this.statusCode = 404;
  }
}
class ErrorBadRequest extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = { ErrorUnauthorized, ErrorNotFound, ErrorBadRequest };
