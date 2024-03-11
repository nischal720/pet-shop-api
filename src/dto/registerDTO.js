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
    const names = fullName?.split(' ');
    // Check if at least a first name and a last name are present
    if (names.length < 2 || !names[0] || !names[names.length - 1]) {
      throw new Error("Fullname must include both a first name and a last name");
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
