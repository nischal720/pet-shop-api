const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const sendEmail = require("../emailController");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  try {
    // Check if the user or username already exists
    const findUser = await User.findOne({ email });
    const findUsername = await User.findOne({ username });

    if (findUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (findUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user instance
    const newUser = new User(req.body);

    // Generate a random password
    const password = await newUser.createRandomPassword();

    // Set the password without rehashing
    newUser.password = password;

    // Save the user to the database
    await newUser.save();

    // Send an email with the generated password
    const emailData = {
      to: newUser.email,
      text: `Hi, ${newUser.username}`,
      subject: "Registration",
      html: `Hi, your password is ${password}. Please change your password.`,
    };
    sendEmail(emailData);

    res.json("Registration Successful. Check your email for the password.");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { registerUser };
