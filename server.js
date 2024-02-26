const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const dbConnect = require("./src/config/dbConfig");
const { notFounnd, errorHandler } = require("./src/middlewares/errorHandler");
const authRoutes = require("./src/routes/authRoutes");
const viewerRoutes = require("./src/routes/userRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 9000;
const app = express();
dbConnect();

// Middleware
app.use(fileUpload());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

//ROutes
app.use("/api/user", authRoutes);
app.use("/api/pet", viewerRoutes);

app.use(notFounnd);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
