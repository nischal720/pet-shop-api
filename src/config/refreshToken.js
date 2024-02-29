const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" });
};


const verifyRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return null;
  }
};

module.exports = { generateRefreshToken, verifyRefreshToken };
