const express = require("express");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/app-1")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// import users
const users = require("./MOCK_DATA.json");
const { timeStamp } = require("console");
const port = 3000;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobtitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//imp for handling json data
// Required for POST & PATCH
// Without this → req.body = undefined
app.use(express.json());

//MIDDLEWEAR
  app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {    //MIDDLEWARE
  fs.appendFile(
    "log.txt",
    `${Date.now()} : ${req.method} , ${req.path}  \n`,
    (error) => {}
  );

  next();
});

//GET all users
app.get("/api/users", async(req, res) => {
  //http headers
  const alluser= await User.find({})
  res.setHeader("X-Myname", "ayush");
  res.json(alluser);
});

//GET specific users
app.get("/api/users/:id", async(req, res) => {
  const user=await User.findById(req.params.id);
   if (await !user) {
     res.status(404).send("user not found");
  }
  res.json(user);
});

//POST
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ message: "ALl fields required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobtitle: body.job_title,
  });
console.log(result);
  return res.status(201).json({message:"sucess"})
  
  
  
});

//PATCH
app.patch("/api/users/:id", async(req, res) => {
  const user= await User.findByIdAndUpdate(req.params.id ,{})
});

//DELETE
app.delete("/api/users/:id", async(req, res) => {
  const user=await User.findByIdAndDelete(req.params.id)
  res.json({message:"sucess",user: user})
});

//port assigning
app.listen(port, () => {
  console.log(`Server started on port: ${port} `);
});
