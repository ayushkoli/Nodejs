const express = require("express");
const { createPost, getpost } = require("../controllers/postcontroller");
const router = express.Router();
const authmiddleware=require("../middlewares/auth")
router.post("/",authmiddleware,createPost)
router.get("/",authmiddleware,getpost)



module.exports = router;
