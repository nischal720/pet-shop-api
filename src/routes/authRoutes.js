const express = require("express");
const {
  registerUser,
} = require("../controller/authController/registerController");
const { loginUser } = require("../controller/authController/loginController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");
const {
  updatePassword,
} = require("../controller/authController/updatePasswordController");
const {
  createPetDetails,
} = require("../controller/petDetailController/createPetDetail");
const { updatePetDetails } = require("../controller/petDetailController/updatePetDetails");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/password", authMiddleWare, updatePassword);
router.post("/pet-details", authMiddleWare, isAdmin, createPetDetails);
router.put("/pet-details/:id", authMiddleWare, isAdmin, updatePetDetails);

module.exports = router;
