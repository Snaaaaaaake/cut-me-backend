const router = require("express").Router();
const linksApiRouter = require("./linksApiRouter");
const usersApiRouter = require("./usersApiRouter");
const reactController = require("../controllers/reactController");
const { getHashedLinkController } = require("../controllers/linksController");

router.get("/", reactController);
router.get("/user/links", reactController);
router.use("/linksApi", linksApiRouter);
router.use("/usersApi", usersApiRouter);
router.get("/:hash", getHashedLinkController);

module.exports = router;
