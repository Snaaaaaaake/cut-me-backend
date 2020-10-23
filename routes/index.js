const router = require("express").Router();
const mainPageRouter = require("./mainPageRouter");
const linksRouter = require("./linksRouter");
const manageLinksRouter = require("./manageLinksRouter");
const usersRouter = require("./usersRouter");

router.use("/", mainPageRouter);
router.use("/links", manageLinksRouter);
router.use("/users", usersRouter);
router.use("/", linksRouter);

module.exports = router;
