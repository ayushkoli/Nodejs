const User=require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup= async(req,res)=>{
    try{
        const {name,email,password}=req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists");
    }

    const hashedpass=await bcrypt.hash(password,10);
    const user=await User.create({
        name,
        email,
        password:hashedpass,
    })
    const token = jwt.sign({
      userId: user._id }, 
      process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token",token,{
        httpOnly:true,
    })
    return res.redirect("/home")
    }
    catch(err){
        console.log(err);
        return res.send("signup failed")
        
    }
    

}

const login=async(req,res)=>{
    try{
    const{email,password}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return res.send("email incoreect")
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.send("pass incorrect")
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
    });
    return res.redirect("/home");
        
    }catch(err){
        console.log(err);
        return res.send("login failed")
        
    }
    

}

module.exports={login,signup}