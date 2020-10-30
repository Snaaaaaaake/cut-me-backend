const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../configs/jwtSecret");
const User = require("../models/userSchema");

const returnUserWithCookie = (res) => (user) => {
  const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });
  // Вырезаем пароль
  const { _id, __v, name, email } = user;
  res
    .cookie("jwt", token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    })
    .send({ _id, __v, name, email });
};

const getUserDataController = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((data) => res.send(data))
    .catch((e) => next(e));
};

const signUpController = (req, res, next) => {
  const { name, email, password } = req.body;
  const cryptedPassword = bcrypt.hashSync(password, 10);
  const cryptedUser = { name, email, password: cryptedPassword };
  User.create(cryptedUser)
    .then(returnUserWithCookie(res))
    .catch((e) => next(e));
};

const signInController = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then(returnUserWithCookie(res))
    .catch((e) => next(e));
};

const signOutController = (req, res) => {
  res.clearCookie("jwt").send({ statusCode: 200 });
};

module.exports = {
  getUserDataController,
  signUpController,
  signInController,
  signOutController,
};
