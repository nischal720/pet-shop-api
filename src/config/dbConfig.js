const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined");
    }
    const conn = mongoose.connect(process.env.MONGODB_URL);

    // console.log("Database connected successfully");
  } catch (error) {
    console.error("Database Error:", error.message);
  }
};

module.exports = dbConnect;
