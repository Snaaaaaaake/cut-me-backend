const mongoose = require("mongoose");
const validator = require("validator");

const linkSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      message: 'Поле "ссылка" должно содержать ссылку',
      validator(url) {
        return validator.isURL(url) && !/[<>]/gi.test(url);
      },
    },
  },
  title: {
    type: String,
    validate: {
      message: (props) => `'${props.value}' Эта строка должна содержать только цифры или буквы`,
      validator(hash) {
        return /^[а-яёa-z0-9_-\s]*$/i.test(hash);
      },
    },
  },
  hash: {
    type: String,
    required: true,
    validate: {
      message: "Короткий текст ссылки должен содержать только цифры или латинские буквы",
      validator(hash) {
        return /^[a-z0-9_-]*$/i.test(hash);
      },
    },
  },
  counter: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("link", linkSchema);
