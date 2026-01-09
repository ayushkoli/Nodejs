const express = require("express");
const app = express();
const fs = require("fs");

// import users
const users = require("./MOCK_DATA.json");
const port = 3000;

//imp for handling json data
// Required for POST & PATCH
// Without this → req.body = undefined
app.use(express.json());

//MIDDLEWEAR
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    fs.appendFile("log.txt", `${Date.now()} : ${req.method} , ${req.path}  \n`,(error)=>{

    });

  next()
})


//GET all users
app.get("/api/users", (req, res) => {
  //http headers
  console.log(req.headers);
  res.setHeader("X-Myname","ayush")
  res.json(users);
});

//GET specific users
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id); //get id from url
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.send("user not found");
  }
  res.json(user);
});

//POST
app.post("/api/users", (req, res) => {
  const body = req.body;
  const user = { id: users.length + 1, ...body }; //user is a obj
  users.push(user); //users is a array
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
    //we stringify users as files dont understand arrays so we convert it into        file readable format

    if (error) {
      res.json({ message: "error" });
    }

    res.json({ message: "sucess", user: user });
  });
});

//PATCH
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const user = users.find((user) => user.id === id);
  Object.assign(user, body); //update users's user
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
    res.json({ message: "suceess", user: user });
  });
});

//DELETE
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);
  const deleteduser = users.splice(index, 1); //delete the user at that index
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
    res.json({ message: "user deleted", id: id, user: deleteduser });
  });
});

//port assigning
app.listen(port, () => {
  console.log(`Server started on port: ${port} `);
});
