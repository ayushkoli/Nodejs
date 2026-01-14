const mongoose = require("mongoose");

async function connectmongo(url) {
  mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
}

module.exports = connectmongo;
