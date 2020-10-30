const crc = require("crc");
const Link = require("../models/linkSchema");
const nullCheck = require("../modules/nullCheck");
const { ErrorBadRequest } = require("../modules/errors");

const addLinkController = (req, res, next) => {
  const { url, title, short, owner } = req.body;
  const counter = 0;
  const date = new Date();
  const rawHash = crc.crc32(date.toString()).toString(16);
  const hash = short ? `${rawHash}_${short.toLowerCase()}` : rawHash;
  Link.create({ url, title, short, counter, date, hash, owner })
    .then(nullCheck)
    .then((data) => res.send([data]))
    .catch((e) => {
      let err;
      if (/validation failed/.test(e.message)) {
        err = new ErrorBadRequest(e.message.replace("link validation failed:", "Ошибка валидации поля"));
      } else {
        err = e;
      }
      return next(err);
    });
};

const removeLinkController = (req, res, next) => {
  const { _id } = req.body;
  Link.deleteOne({ _id, owner: req.user._id })
    .then(nullCheck)
    .then(() => res.send({ statusCode: 200 }))
    .catch((e) => next(e));
};

const removeLinkManyController = (req, res, next) => {
  const { array } = req.body;
  Link.deleteMany({ _id: { $in: array }, owner: req.user._id })
    .then(nullCheck)
    .then(() => res.send({ statusCode: 200 }))
    .catch((e) => next(e));
};

const updateLinkController = (req, res, next) => {
  const { _id, title } = req.body;
  Link.updateOne(
    { _id, owner: req.user._id },
    { title },
    {
      new: true,
      runValidators: true,
    }
  )
    .then(nullCheck)
    .then((data) => res.send([data]))
    .catch((e) => next(e));
};

const getLinksController = (req, res, next) => {
  const { owner } = req.body;
  Link.find({ owner })
    .then((data) => res.send(data))
    .catch((e) => next(e));
};

const getHashedLinkController = (req, res, next) => {
  const { hash } = req.params;
  Link.findOneAndUpdate({ hash }, { $inc: { counter: 1 } })
    .then(nullCheck)
    .then((link) => {
      res.redirect(link.url);
    })
    .catch(() => next());
};
module.exports = {
  addLinkController,
  removeLinkController,
  updateLinkController,
  getLinksController,
  removeLinkManyController,
  getHashedLinkController,
};
