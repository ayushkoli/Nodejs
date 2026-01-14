const express = require('express')
const router=express.Router();
const { createuser, getuser, getuserbyid, patchuser, deleteuser }=require("../controller/usercontroller")

router.post("/", createuser);

//Read
router.get("/",getuser);

//Read by id
router.get("/:id", getuserbyid);

//Update
router.patch("/:id",patchuser);

//delete
router.delete("/:id", deleteuser);

module.exports=router;