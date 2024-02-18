const { generateToken } = require("../../config/jwtToken");

class LoginResDTO {
  constructor({
    id,
    username,
    fullname,
    changePassword,
    role,
    email,
    isBlocked,
  }) {
    this.id = id;
    this.username = username;
    this.fullname = fullname;
    this.changePassword = changePassword;
    this.role = role;
    this.email = email;
    this.isBlocked = isBlocked;
    this.token = generateToken(id);
  }
}
module.exports = LoginResDTO;
