const mongoose = require("mongoose");
const validator = require("validator");
const bscript = require("bcryptjs");
const { ErrorUnauthorized } = require("../modules/errors");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      message: "Имя может содержать только буквы и цыфры",
      validator(hash) {
        return /^[a-zа-яё0-9_-\s]*$/i.test(hash);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      message: (props) => `'${props.value}' Эта строка должна быть почтой!`,
      validator(e) {
        return validator.isEmail(e);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  if (!email || !password) {
    throw new ErrorUnauthorized("Проверьте правильность ввода почты и пароля");
  }
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized("Пользователь не найден");
      }
      const passMatch = bscript.compareSync(password, user.password);
      if (!passMatch) {
        throw new ErrorUnauthorized("Проверьте правильность ввода почты и пароля");
      }
      return user;
    });
};

module.exports = mongoose.model("user", userSchema);
