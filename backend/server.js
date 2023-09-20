const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const path = require("path");
const port = process.env.PORT || 5000;
const { errorHandler, NotFound } = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const fileRoutes = require("./routes/fileRoutes");
const storyRoutes = require("./routes/storyRoutes");
const followRoutes = require("./routes/followRoutes");

connectDB();

global.__basedir = __dirname;

app.use((req, res, next) => {
  console.log("Request URL:", req.url);
  next();
});

app.use("/images", express.static(__basedir + "/images"));
app.use("/stories", express.static(__basedir + "/stories"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use(fileRoutes);
app.use(storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/user", followRoutes);

app.use(errorHandler);
app.use(NotFound);

app.listen(port, () => console.log(`Server is running on: ${port}..`));
