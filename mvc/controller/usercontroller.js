const Users = require("../model/model");

const createuser = async (req, res) => {
  const user = await Users.create(req.body);
  res.status(201).json({ Message: "user created", user: user });
};

//Read
const getuser = async (req, res) => {
  const alldata = await Users.find();
  res.send(alldata);
};

//Read by id
const getuserbyid = async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.json(user);
};

//Update
const patchuser = async (req, res) => {
  const updateduser = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "updated", user: updateduser });
};

//delete
const deleteuser = async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  res.json({ message: "sucess", user: user });
};

module.exports = { createuser, getuser, getuserbyid, patchuser, deleteuser };
