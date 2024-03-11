const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const validateMongoDBID = require("../../utils/validateMongoDBID");
const comparePasswords = require("../../utils/compareUserPassword");
const UpdatePasswordDTO = require("../../dto/updatePasswordDTO");

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  const updatePasswordDTO = new UpdatePasswordDTO(id, oldPassword, newPassword);
  try {
    const findUser = await User.findById(updatePasswordDTO.id);
    const isPasswordValid = await comparePasswords(
      updatePasswordDTO.oldPassword,
      findUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid  password");
    }
    // Change new password with old one
    findUser.password = newPassword;
    findUser.changePassword = true;
    //Save the user to database
    await findUser.save();
    // Send Response
    res.status(201).json({ message: "Password Successfully change" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { updatePassword };
