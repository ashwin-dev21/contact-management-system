const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken")
const User = require("../models/userModel");

const registerUser = asyncHandler(async(req,res) =>{
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user  already exist");
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("hashed password",hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    if(user){
        res.status(201).json({user_id:user.id,email:user.email})
    }else{
        res.status(400);
        throw new Error("user data is not valid")
    }
    res.json({message:"Registerd"})
}) 

const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email});
    //compare password with hashedpassword
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
             user:{
                username:user.username,
                email:user.email,
                id:user.id,
             },
        },process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("Email or Password not valid")
    }
})

const currentUser = asyncHandler(async(req,res) =>{
    res.json(req.user)
})


module.exports = {registerUser,loginUser,currentUser};