const express = require("express");
const { homepage, makeurl } = require("../controller/controller");
const router = express.Router();

router.get("/",homepage)

router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.get("/login",(req,res)=>{
    return res.render("login")
})


module.exports=router