const validator = require("validator");

class RegisterDTO {
  constructor(email, username, fullName) {
    this.validateEmail(email);
    this.validateUsername(username);
    this.validateFullName(fullName);
    this.email = email;
    this.username = username;
    this.fullName = fullName;
  }

  validateEmail(email) {
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }
  }

  validateFullName(fullName) {
    if (!fullName) {
      throw new Error("Field Fullname is required");
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
