require("dotenv").config();

const express = require("express");
const connect = require("./config/connectdb");
const cookieParse = require("cookie-parser");
const authRoutes = require("./routes/authroutes");
const postRoutes = require("./routes/postroutes");
const Post = require("./models/post");
const authmiddleware = require("./middlewares/auth");
const app = express();
const port = 8000;
connect("mongodb://127.0.0.1:27017/practice");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParse());
app.use(express.static("public"));
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/home", authmiddleware, async (req, res) => {
  try {
    const allpost = await Post.find().populate("userId", "name email");

    const posts = await Post.find({ userId: req.user._id });

    res.render("home", {
      user: req.user,
      posts: posts, 
      allpost:allpost,
    });
  } catch (error) {
    console.log(error);
    res.send("Error loading home page");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
