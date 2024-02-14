const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const validateMongoDBID = require("../../utils/validateMongoDBID");
const comparePasswords = require("../../utils/compareUserPassword");

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;
  try {
    if (!oldPassword || !newPassword) {
      throw new Error("Both oldPassword and newPassword are required");
    }

    validateMongoDBID(id); //validate id 

    const findUser = await User.findById(id);
    const isPasswordValid = await comparePasswords(
      oldPassword,
      findUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid old password");
    }
    // Change new password with old one
    findUser.password = newPassword;
    findUser.changePassword = false;
    //Save the user to database
    await findUser.save();
    // Send Response
    res.status(201).json({ message: "Password Successfully change" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { updatePassword };
