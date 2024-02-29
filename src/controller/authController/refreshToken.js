const asyncHandler = require("express-async-handler");
const { verifyRefreshToken } = require("../../config/refreshToken");
const { generateToken } = require("../../config/jwtToken");

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      throw new Error("No Refresh Token provided");
    }
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    const newAccessToken = generateToken(decoded.id);
    res.json({ token: newAccessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Errro" });
  }
});

module.exports = { refreshToken };
