const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* ================= SIGNUP ================= */
const signup = async (req, res) => {
  const body = req.body;

  const hashedpass = await bcrypt.hash(body.password, 10);

  const user = await User.create({
    name: body.name,
    email: body.email,
    password: hashedpass,
  });

  // ✅ FIXED jwt.sign
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.redirect("/home");
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "wrong email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: "invalid pass" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.redirect("/home");
};

module.exports = { signup, login };
