const express = require("express");
const path=require("path")
const mongoconnection = require("./config/connectdb");
const router = require("./routes/urlroutes");
const staticrouter=require("./routes/staticrouter")
const URL=require("./model/url")

const app = express();
const port = 8000;


// Connect to MongoDB
mongoconnection("mongodb://127.0.0.1:27017/shorturl");

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Route handler for URL-related APIs
// Must be placed after middleware
app.use("/url", router);
app.use("/",staticrouter)




// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
