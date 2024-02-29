const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleWare = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers?.authorization?.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const now = new Date();
        // Check token expiration
        if (decoded.exp < now.getTime() / 1000) {
          throw new Error("Token has expired");
        }
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token, Please Login again");
    }
  } else {
    throw new Error("There is no token attatched to Header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user.role !== "admin") {
    throw new Error("You are not admin");
  } else {
    next();
  }
});

module.exports = { authMiddleWare, isAdmin };
