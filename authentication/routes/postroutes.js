const express=require("express");
const { createPost, getPost } = require("../controller/post");
const authmiddleware = require("../middleware/auth");
const Postroute=express.Router();

Postroute.post("/", authmiddleware, createPost);


Postroute.get("/",authmiddleware,getPost)

module.exports=Postroute;