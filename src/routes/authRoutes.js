const express = require("express");
const {
  registerUser,
} = require("../controller/authController/registerController");
const { loginUser } = require("../controller/authController/loginController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
