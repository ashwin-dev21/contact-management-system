const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            // required:true,
            ref:"User", 
        },
    username :{
        type:String,
        required:[true,"Mention your username"],
    },
    email:{
        type:String,
        required:[true,"Mention your email"],
        unique:[true,"Email already exist"], 
    }, 
    password:{
        type:String,
        required:[true,"Enter your password"]
    },
}, {
    timestamps:true,
});

module.exports = mongoose.model("User",userSchema);