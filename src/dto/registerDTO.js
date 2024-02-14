const validator = require("validator");

class RegisterDTO {
  constructor(email, username) {
    this.validateEmail(email);
    this.validateUsername(username);

    this.email = email;
    this.username = username;
  }

  validateEmail(email) {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }
  }

  validateUsername(username) {
    const minLength = 4;
    if (username.length < minLength) {
      throw new Error(`Username must be at least ${minLength} characters long`);
    }
  }
}

module.exports = RegisterDTO;
