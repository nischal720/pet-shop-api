const express = require("express");
const {
  getImage,
  getPetDetails,
} = require("../controller/petDetailController/getPetData");
const router = express.Router();

router.get("/pet-image/:name", getImage);
router.get("/pet-details", getPetDetails);

module.exports = router