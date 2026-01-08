// const express=require("express")
// const app=express();
// const users=require("./MOCK_DATA.json")
// const port=3000;
// const fs=require("fs")
// app.use(express.urlencoded({extended:false}));

// app.get("/api/users/",(req,res)=>{
    
//     return res.json(users)
// })
// app.get((req,res)=>{
//     const id=Number(req.params.id);
//     const user=users.find(user=>user.id===id)
//     return res.json(user)
// })
// app.route("/api/users/:id")
// .get((req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// })
// .patch((req,res)=>{
//     res.json({ status: "pending" });
    
// })
// .delete((req,res)=>{
//     const id = Number(req.params.id);
    
    
//     const newusers=users.filter(user=>user.id!=id)
//     fs.writeFile("./MOCK_DATA.json",JSON.stringify(newusers),(err)=>{
//         return res.json({ status: "sucess",id: `Deleted id,${id}` });
//     });
    
    
 
    
// })

// app.post("/api/users",(req,res)=>{
//     const body=req.body;
//     users.push({...body,id:users.length+1});
//     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
//         return res.json({ status: "sucess",id: users.length });
//     });
    
    

// })


// app.listen(port,()=>{
//     console.log(`Server started on port: ${port}`);
    
// })

const express=require("express")
const app=express();
const fs=require("fs")
// import users
const users=require("./MOCK_DATA.json");
const { json } = require("stream/consumers");
const port=3000;

//imp for handling json data 
// Required for POST & PATCH
// Without this → req.body = undefined
app.use(express.json())
//MIDDLEWEAR
app.use(express.urlencoded({ extended: true }));


//GET all users

app.get("/api/users",(req,res)=>{
    res.json(users)
})

//GET specific users

app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id); //get id from url
    const user=users.find(user=>user.id===id)
    if(!user){
        res.send("user not found")
    }
    res.json(user)
})

//POST

app.post("/api/users",(req,res)=>{
    const body=req.body;
    const user={id: users.length+1,...body} //user is a obj
    users.push(user) //users is a array
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(error)=>{ //we stringify users as files dont understand arrays so we convert it into file readable format
        res.json({message:"sucess",id:users.length})
        if(error){
            res.json({ message: "error"});
        
        }
    });
    
})

//PATCH

app.patch("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const body=req.body;
    const user=users.find(user=>user.id===id)
    Object.assign(user,body)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(error)=>{
        res.json({message:"suceess",id:user.id})
    })

})

//DELETE

app.delete("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id)
    const index=users.findIndex(user=>user.id===id)
    const deleteduser=users.splice(index,1)
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(error)=>{
        res.json({message:"user deleted",id:id})
    })

})

//port assigning

app.listen(port,()=>{
    console.log(`Server started on port: ${port} `);
    
})