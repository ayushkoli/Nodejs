const User = require("../models/user"); // User model
const jwt = require("jsonwebtoken"); // JWT library

async function authmiddleware(req, res, next) {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    return res.redirect("/login"); // Not logged in
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT

    const user = await User.findById(decode.userId); // Fetch user from DB

    if (!user) {
      return res.redirect("/login"); // User not found
    }

    req.user = user; // Attach user to request
    next(); // Continue request
  } catch (err) {
    return res.redirect("/login"); // Invalid / expired token
  }
}

module.exports = authmiddleware; // Export middleware
