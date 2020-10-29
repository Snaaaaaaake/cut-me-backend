const path = require("path");

const reactController = (req, res) => {
  console.log(path.join(__dirname, "../public", "index.html"));
  res.sendFile(path.join(__dirname, "../public", "index.html"));
};

module.exports = reactController;
