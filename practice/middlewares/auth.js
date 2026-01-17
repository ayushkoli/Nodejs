const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Auth middleware function
// This runs BEFORE protected routes
async function authmiddleware(req, res, next) {
  // 1️⃣ Read JWT token from HTTP-only cookie
  // Browser automatically sends cookies with every request
  const token = req.cookies.token;

  // 2️⃣ If token does not exist, user is not logged in
  // We stop the request immediately
  if (!token) {
    return res.redirect("/login")
  }

  try {
    // 3️⃣ Verify the JWT using the server's secret key
    // - Checks token is genuine
    // - Checks token is not expired
    // - Returns decoded payload if valid
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Extract userId from decoded token payload
    // decode looks like:
    // { userId: "...", iat: ..., exp: ... }

    // 5️⃣ Fetch the user from database using userId
    // Database is the final source of truth
    const user = await User.findById(decode.userId);

    // 6️⃣ If user does not exist (deleted / invalid)
    // Reject the request
    if (!user) {
      return res.redirect("/login");
    }

    // 7️⃣ Attach authenticated user to req.user
    // This is TRUSTED because:
    // - JWT was verified
    // - User was fetched from DB
    req.user = user;

    // 8️⃣ Pass control to the next middleware or controller
    next();
  } catch (err) {
    // 9️⃣ If JWT is invalid, expired, or tampered
    // jwt.verify throws an error → we catch it here
    return res.redirect("/login")
  }
}

module.exports = authmiddleware;
