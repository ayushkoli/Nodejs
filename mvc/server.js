const express = require("express");
const app = express();
const connect=require("./config/db")
const userRouters=require("./routes/userroutes");

const port = 8000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect();
app.use(express.static("public"));

app.use("/users",userRouters)


//start server
app.listen(port, () => {
  console.log("Server started on port :", port);
});
