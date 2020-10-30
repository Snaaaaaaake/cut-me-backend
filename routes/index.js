const router = require("express").Router();
const linksApiRouter = require("./linksApiRouter");
const usersApiRouter = require("./usersApiRouter");
const { getHashedLinkController } = require("../controllers/linksController");

router.use("/linksApi", linksApiRouter);
router.use("/usersApi", usersApiRouter);
router.get("/:hash", getHashedLinkController);

module.exports = router;
