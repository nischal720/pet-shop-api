class LoginDTO {
  constructor(
    id,
    username,
    fullname,
    changePassword,
    role,
    email,
    isBlocked,
    token
  ) {
    this.id = id;
    this.username = username;
    this.fullname = fullname;
    this.changePassword = changePassword;
    this.role = role;
    this.email = email;
    this.isBlocked = isBlocked;
    this.token = token;
  }
}
module.exports = LoginDTO;
