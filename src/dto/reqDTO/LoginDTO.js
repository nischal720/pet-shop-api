class LoginDTO {
  constructor(username, password) {
    this.bothValidate(
      username,
      password,
      "Username and Password cannot be empty or null"
    );
    this.validate(username, "Username cannot be null or empty");
    this.validate(password, "Password cannot be null or empty");
    this.username = username;
    this.password = password;
  }

  validate(value, errorMessage) {
    if (value === null || typeof value !== "string" || value.trim() === "") {
      throw new Error(errorMessage);
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
}

module.exports = LoginDTO;
