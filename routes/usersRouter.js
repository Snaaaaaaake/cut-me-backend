const router = require("express").Router();
const auth = require("../middlewares/auth");
const { signUp, signIn, signOut } = require("../controllers/userController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", auth, signOut);

module.exports = router;
