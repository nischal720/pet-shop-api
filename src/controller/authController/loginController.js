const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const { generateToken } = require("../../config/jwtToken");

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const finduser = await User.findOne({ username: username });

    if (!finduser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await finduser?.isPasswordMatch(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const responseData = {
      id: finduser.id,
      username: finduser.username,
      fullName: finduser.fullname,
      changePassword: finduser.changePassword,
      role: finduser.role,
      email: finduser.email,
      isBlocked: finduser.isBlocked,
      token: generateToken(finduser._id),
    };
    res.json(responseData);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { loginUser };
