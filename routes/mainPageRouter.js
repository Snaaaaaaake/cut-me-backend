const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(404).send("<h1>Ничего не найдено</h1>");
});

module.exports = router;
