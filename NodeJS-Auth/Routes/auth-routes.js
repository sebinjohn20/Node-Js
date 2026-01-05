const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
  changeEmail,
} = require("../Controllers/auth-controller");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
//all routes are related to authentication &authorization

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", authMiddleware, changePassword);
router.post("/change-email", authMiddleware, changeEmail);
module.exports = router;
