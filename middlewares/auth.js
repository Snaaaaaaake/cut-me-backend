const jwt = require("jsonwebtoken");
const { ErrorUnauthorized } = require("../modules/errors");
const jtwSecret = require("../configs/jwtSecret");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    payload = jwt.verify(token, jtwSecret);
  } catch (e) {
    return next(new ErrorUnauthorized());
  }
  req.user = payload;
  return next();
};
