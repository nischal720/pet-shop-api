const asyncHandler = require("express-async-handler");
const User = require("../../model/userModel");
const LoginDTO = require("../../dto/reqDTO/LoginDTO");
const LoginResDTO = require("../../dto/resDTO/LoginReqDTO");

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const loginReq = new LoginDTO(username, password);

  try {
    const finduser = await User.findOne({ username: loginReq.username });

    if (!finduser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordMatch = await finduser?.isPasswordMatch(loginReq.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const loginRes = new LoginResDTO(finduser);
    res.json(loginRes);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { loginUser };
