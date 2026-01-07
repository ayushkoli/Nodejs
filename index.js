
// const http=require("http");
// const fs=require("fs")
// const url=require("url")
// const Server=http.createServer((req,res)=>{
//     if(req.url=="/favicon.ico") return res.end();
//     const logs=`${req.url} ${req.method} ${Date.now()} , request received\n`
//     const Url=url.parse(req.url,true);
//     fs.appendFile("log.txt",logs ,(error)=>{
//     switch (Url.pathname) {
//         case "/":
//             res.write("Server created");
            
//             break;
//         case "/about-us":
//             const username=Url.query.name
//             res.write(`My name is ${username}`)
//             break;
    
//         default:
//             res.write("error")
//             break;
//     }
//      res.end()
//     })
   
// });

// Server.listen(3000,()=>{
//     console.log("server started");
    
// })

const express=require("express")
const app=express();
const port=8000;

app.get("/",(req,res)=>{
    res.send("Hello from home")
})
app.get("/about-us",(req,res)=>{
    res.send(`Hello from ${req.query.name}`)
})
app.listen(port,()=>{
    console.log("server started");
    
})