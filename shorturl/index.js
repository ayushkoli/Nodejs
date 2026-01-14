const express = require("express");
const mongoconnection = require("./config/connectdb");
const router = require("./routes/urlroutes");

const app = express();
const port = 8000;

// Connect to MongoDB
mongoconnection("mongodb://127.0.0.1:27017/shorturl");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route handler for URL-related APIs
// Must be placed after middleware
app.use("/url", router);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
