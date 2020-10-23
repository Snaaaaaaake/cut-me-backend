const crc = require("crc");
const Link = require("../models/linkSchema");
const nullCheck = require("../modules/nullCheck");

const addLink = (req, res, next) => {
  const owner = req.user ? req.user._id : "5f91d4ade6a8f725188ff0e5";
  const { url, title, short } = req.body;
  const counter = 0;
  const date = new Date();
  const rawHash = crc.crc32(date.toString()).toString(16);
  const hash = short ? `${rawHash}_${short.toLowerCase()}` : rawHash;

  Link.create({ url, title, short, counter, date, hash, owner })
    .then(nullCheck)
    .then((data) => res.send(data))
    .catch((e) => next(e));
};

const removeLink = (req, res, next) => {
  const { _id } = req.body;
  Link.findByIdAndRemove(_id)
    .then(nullCheck)
    .then(() => res.send({ status: 200 }))
    .catch((e) => next(e));
};

const updateLink = (req, res, next) => {
  const { id, title } = req.body;
  Link.findByIdAndUpdate(
    id,
    { title },
    {
      new: true,
      runValidators: true,
    }
  )
    .then(nullCheck)
    .then((data) => res.send(data))
    .catch((e) => next(e));
};
module.exports = { addLink, removeLink, updateLink };
