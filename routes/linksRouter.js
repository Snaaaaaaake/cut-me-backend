const router = require("express").Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`<h1>Запрос ${id}</h1>`);
});

module.exports = router;
