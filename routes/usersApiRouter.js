const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getUserDataController,
  signUpController,
  signInController,
  signOutController,
} = require("../controllers/userController");

router.get("/me", auth, getUserDataController);
router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/signout", auth, signOutController);

module.exports = router;
