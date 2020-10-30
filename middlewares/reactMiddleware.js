const path = require("path");

const reactMiddleware = (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
};

module.exports = reactMiddleware;
