const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addLink,
  removeLink,
  updateLink,
} = require("../controllers/linksController");

router.post("/add", addLink);
router.delete("/remove", auth, removeLink);
router.patch("/update", auth, updateLink);

module.exports = router;
