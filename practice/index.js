require("dotenv").config(); // Load environment variables

const express = require("express");
const connect = require("./config/connectdb");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authroutes"); // Auth routes
const postRoutes = require("./routes/postroutes"); // Post routes

const Post = require("./models/post"); // Post model
const authMiddleware = require("./middlewares/auth"); // Auth check middleware

const app = express();
const port = 8000;

connect("mongodb://127.0.0.1:27017/practice"); // MongoDB connection

app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse form data

app.set("view engine", "ejs"); // Template engine
app.set("views", "views"); // Views folder

app.use(cookieParser()); // Read cookies
app.use(express.static("public")); // Static files

app.use("/auth", authRoutes); // Auth routes
app.use("/posts", postRoutes); // Post routes

app.get("/home", authMiddleware, async (req, res) => {
  try {
    const allPost = await Post.find().populate("userId", "name email"); // Add user info to posts

    res.render("home", {
      user: req.user,
      allpost: allPost,
    });
  } catch (error) {
    console.log(error);
    res.send("Error loading home page");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token"); // Remove auth token
  res.redirect("/login");
});

app.get("/signup", (req, res) => {
  res.render("signup"); // Signup page
});

app.get("/mypost", authMiddleware, async (req, res) => {
  const posts = await Post.find({ userId: req.user._id }); // User posts

  res.render("mypost", {
    user: req.user,
    posts,
  });
});

app.get("/login", (req, res) => {
  res.render("login"); // Login page
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`); // Server start
});
