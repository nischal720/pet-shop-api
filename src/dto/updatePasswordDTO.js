const validateMongoDBID = require("../utils/validateMongoDBID");

class UpdatePasswordDTO {
  constructor(id, oldPassword, newPassword) {
    this.validateId(id);
    this.bothValidate(
      oldPassword,
      newPassword,
      "Old and new password is not present"
    );
    this.validatePassword(oldPassword, "Old password is required");
    this.validatePassword(newPassword, "New Password is required");
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.id = id;
  }
  validatePassword(password, message) {
    if (
      password === null ||
      typeof password !== "string" ||
      password.trim() === ""
    ) {
      throw new Error(message);
    }
  }
  bothValidate(firstValue, secondValue, message) {
    if (
      (firstValue === null || firstValue.trim() === "") &&
      (secondValue === null || secondValue.trim() === "")
    ) {
      throw new Error(message);
    }
  }
  validateId(id) {
    validateMongoDBID(id);
  }
}

module.exports = UpdatePasswordDTO;
