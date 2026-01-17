const Post=require("../models/post")

const createPost=async (req,res)=>{
    try{
    const {title,content}=req.body;
    const userId=req.user._id;
    const post= await Post.create({
        title,
        content,
        userId
    })
    return res.redirect("/home");


    }catch(err){
        console.log(err);
        return res.send("post not created")
        
    }
    
}
const getpost=async(req,res)=>{
    try{
        const userId=req.user._id
        const post=await Post.find({userId})
        return res.redirect("/home");

        
    }catch(error){
        console.log(error);
        return res.send("couldn't get post")
        

    }

}

module.exports={getpost,createPost}