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

module.exports = { ErrorUnauthorized, ErrorNotFound };
