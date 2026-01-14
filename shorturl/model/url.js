const mongoose=require("mongoose")

const dbschema=mongoose.Schema(
    {
        shortId:{
            type:String,
            required:true,
            unique:true,
        },
        redirectURL:{
            type:String,
            required:true
        },
        visits:[
            {
                time:{
                    type:Number
                }
            }
        ]

    }
)

const URL=mongoose.model("URL",dbschema)


module.exports=URL;