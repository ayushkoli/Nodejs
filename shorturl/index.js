const express=require("express");
const mongoconnection=require("./config/connectdb")
const app=express()
const port=8000;

mongoconnection("mongodb://127.0.0.1:27017");

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
    
})