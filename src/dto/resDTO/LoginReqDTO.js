const { generateToken } = require("../../config/jwtToken");
const { generateRefreshToken } = require("../../config/refreshToken");

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
    this.refreshToken = generateRefreshToken(id);
  }
}
module.exports = LoginResDTO;
