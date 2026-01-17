const Post=require("../models/post")

const createPost=async(req,res)=>{
    const body=req.body;
    const post=await Post.create({
        title:body.title,
        content:body.content,
        userId:req.user._id
        
    })
    res.redirect("/home");
}

const getPost=async(req,res)=>{
    const id=req.params.id;
    const post = await Post.find({
      userId: req.user._id,
    });
    res.send(post)
    
}

module.exports={createPost,getPost}