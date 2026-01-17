require("dotenv").config();
const express = require("express");
const connection = require("./config/connectdb");
const Postroute = require("./routes/postroutes");
const authroute = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const authmiddleware = require("./middleware/auth");
const User = require("./models/user");
const Post=require("./models/post")

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



connection("mongodb://127.0.0.1:27017/auth-db");

app.use("/post", Postroute);
app.use("/auth", authroute);


app.get("/home",authmiddleware, async (req, res) => {
  // get only posts of logged-in user
  const posts = await Post.find({ userId: req.user._id });

  res.render("home", {
    user: req.user,
    posts: posts,
  });
});


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token"); // remove JWT
  res.redirect("/login");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
