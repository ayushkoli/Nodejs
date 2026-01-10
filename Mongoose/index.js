const express=require("express")
const app=express()
const port=8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose=require("mongoose")
mongoose
.connect('mongodb://127.0.0.1:27017/app-2')
.then(()=>{console.log("mongodb connected");})
.catch((error)=>{console.log(error);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age: {
        type:Number
    },
    location: {
        type:String
    }
})

const Users = mongoose.model("users",userSchema)

app.post("/users",async(req,res)=>{
    const user=await Users.create(req.body);
   res.json({Message:"user created",user:user})


})
app.get("/users",async(req,res)=>{
    const alldata= await Users.find()
    res.send(alldata)
})

app.get("/users/:id",async(req,res)=>{
    const user=await Users.findById(req.params.id)
    res.json(user)
})

app.patch("/users/:id",async(req,res)=>{
    const updateduser=await Users.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json({ message: "updated", user: updateduser });
})

app.delete("/users/:id",async(req,res)=>{
    const user = await Users.findByIdAndDelete(req.params.id);
    res.json({message:"sucess",user:user})
})


app.listen(port,()=>{
    console.log("Server started on port :", port);
    
})

