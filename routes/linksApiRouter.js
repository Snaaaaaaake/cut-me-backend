const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addLinkController,
  removeLinkController,
  updateLinkController,
  getLinksController,
  removeLinkManyController,
} = require("../controllers/linksController");

router.post("/add", addLinkController);
router.delete("/remove", authMiddleware, removeLinkController);
router.delete("/removeMany", authMiddleware, removeLinkManyController);
router.post("/edit", authMiddleware, updateLinkController);
router.post("/get", authMiddleware, getLinksController);

module.exports = router;
