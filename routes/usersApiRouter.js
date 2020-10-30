const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getUserDataController,
  signUpController,
  signInController,
  signOutController,
} = require("../controllers/userController");

router.get("/me", authMiddleware, getUserDataController);
router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/signout", authMiddleware, signOutController);

module.exports = router;
