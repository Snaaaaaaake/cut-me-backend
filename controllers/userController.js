const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../configs/jwtSecret");
const User = require("../models/userSchema");

const signUp = (req, res, next) => {
  const body = req.body;
  const pass = bcrypt.hashSync(body.password, 10);
  body.password = pass;

  User.create(body)
    .then((data) => res.send(data))
    .catch((e) => next(e));
};

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });
      res
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ status: 200 });
    })
    .catch((e) => next(e));
};

const signOut = (req, res) => {
  res.clearCookie("jwt").send({ status: 200 });
};

module.exports = { signUp, signIn, signOut };
