const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

var userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, index: true },
    username: { type: String, required: true, index: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
    resetPinOTP: {
      type: Number,
      min: 100000,
      max: 999999,
    },
    passwordChangeAt: Date,
    otpExpire: Date,
    changePassword: { type: Boolean, default: false },
    updatedBy: { type: String }, // Change this line to store the username
  },
  { timestamps: true }
);

//encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create a middleware to update the updatedBy field before saving the document
userSchema.pre("updateOne", function (next) {
  this.set({ updatedBy: this.getQuery().username });
  next();
});

//Create a random password for new registration
userSchema.methods.createRandomPassword = async function () {
  return Math.random().toString(36).slice(-7);
};

//reset Password
userSchema.methods.createPasswordResetToekn = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 5 * 60 * 1000; //10 minutes
  return resetToken;
};

//OTP
userSchema.methods.createOtp = function () {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  this.resetPinOTP = otp;
  this.otpExpire = Date.now() + 10 * 1000; // 1 minute expiration
  return otp;
};

//password match
userSchema.methods.isPasswordMatch = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
