const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });
  async function main() {
    try {
      const info = await transporter.sendMail(data);
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error(error);
    }
  }
  main().catch(console.error);
});

module.exports = sendEmail;
