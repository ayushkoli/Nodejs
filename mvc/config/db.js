const mongoose = require("mongoose");
//MONGODB CONNECTION
 function dbconnection() {mongoose
  .connect("mongodb://127.0.0.1:27017/app-2")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  })}

  module.exports=dbconnection;