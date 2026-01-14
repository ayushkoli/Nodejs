const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8000;

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MONGODB CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/app-2")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error);
  });

//MONGO SCHEMA
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

//Create
app.post("/users", async (req, res) => {
  const user = await Users.create(req.body);
  res.status(201).json({ Message: "user created", user: user });
});

//Read
app.get("/users", async (req, res) => {
  const alldata = await Users.find();
  res.send(alldata);
});

//Read by id
app.get("/users/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.json(user);
});

//Update
app.patch("/users/:id", async (req, res) => {
  const updateduser = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "updated", user: updateduser });
});

//delete
app.delete("/users/:id", async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  res.json({ message: "sucess", user: user });
});

//start server
app.listen(port, () => {
  console.log("Server started on port :", port);
});
