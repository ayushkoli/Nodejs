const User = require("../models/user"); // User model
const bcrypt = require("bcrypt"); // Password hashing
const jwt = require("jsonwebtoken"); // JWT library

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Get signup data

    const existingUser = await User.findOne({ email }); // Check existing user
    if (existingUser) {
      return res.send("User already exists");
    }

    const hashedpass = await bcrypt.hash(password, 10); // Hash password

    const user = await User.create({
      name,
      email,
      password: hashedpass,
    }); // Create user

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // Generate JWT

    res.cookie("token", token, {
      httpOnly: true,
    }); // Store token in cookie

    return res.redirect("/home"); // Redirect after signup
  } catch (err) {
    console.log(err); // Log error
    return res.send("signup failed");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Get login data

    const user = await User.findOne({ email }); // Find user
    
    if (!user) {
      return res.send("email incoreect");
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare password

    if (!isMatch) {
      return res.send("pass incorrect");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // Generate JWT

    res.cookie("token", token, {
      httpOnly: true,
    }); // Store token in cookie

    return res.redirect("/home"); // Redirect after login
  } catch (err) {
    console.log(err); // Log error
    return res.send("login failed");
  }
};

module.exports = { login, signup }; // Export controllers
