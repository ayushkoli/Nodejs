const express=require("express");
const { signup, login } = require("../controller/authcontroller");
const authroute=express.Router();

authroute.post("/signup",signup)

authroute.post("/login",login)

module.exports=authroute;