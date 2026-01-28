const Post = require("../models/post"); // Post model

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body; // Get post data
    const userId = req.user._id; // Logged-in user ID

    const post = await Post.create({
      title,
      content,
      userId,
    }); // Create new post

    return res.redirect("/home"); // Redirect to home
  } catch (err) {
    console.log(err); // Log error
    return res.send("post not created"); // Error response
  }
};

const getpost = async (req, res) => {
  try {
    const userId = req.user._id; // Logged-in user ID
    const post = await Post.find({ userId }); // Fetch user's posts

    return res.redirect("/home"); // Redirect to home
  } catch (error) {
    console.log(error); // Log error
    return res.send("couldn't get post"); // Error response
  }
};

module.exports = { getpost, createPost }; // Export controllers
