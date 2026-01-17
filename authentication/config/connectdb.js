const mongoose = require("mongoose");

async function connection(url) {
  try {
    await mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"));
  } catch {
    (err) => console.log(err);
  }
}

module.exports = connection;
