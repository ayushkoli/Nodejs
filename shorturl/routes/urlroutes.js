const express=require("express")
const router=express.Router()
const URL = require("../model/url");

router.post("/",(req,res)=>{
    res.json({message:"working"})
})
module.exports = router;
