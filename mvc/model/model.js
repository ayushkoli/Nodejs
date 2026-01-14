const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  location: {
    type: String,
  },
});

//User Model to interact with mongodb
const Users = mongoose.model("users", userSchema);

module.exports=Users;