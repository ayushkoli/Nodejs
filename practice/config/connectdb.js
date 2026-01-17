const mongoose=require("mongoose")

async function connect(url) {
    await mongoose
    .connect(url)
    .then(console.log("mongodb connected"))
    .catch(err=>console.log(err)
    )
    
}
module.exports=connect;