const mongoose = require("mongoose");

// Connect to MongoDB using provided connection string
async function connectmongo(url) {
  mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
}

module.exports = connectmongo;
