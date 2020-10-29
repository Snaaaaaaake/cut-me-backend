const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  addLinkController,
  removeLinkController,
  updateLinkController,
  getLinksController,
  removeLinkManyController,
} = require("../controllers/linksController");

router.post("/add", addLinkController);
router.delete("/remove", auth, removeLinkController);
router.delete("/removeMany", auth, removeLinkManyController);
router.post("/edit", auth, updateLinkController);
router.post("/get", auth, getLinksController);

module.exports = router;
