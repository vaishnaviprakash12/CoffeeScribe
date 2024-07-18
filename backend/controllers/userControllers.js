const asyncHandler= require('express-async-handler');
const User=require('../models/userModels');
const genrateToken = require('../utils/genrateToken');
//registartion api
const registerUser = asyncHandler(async (req,res)=>{
const {name,email,password,pic}=req.body; //requesting all of these from user

//function to check if the user already exists
 const userExists=await User.findOne({
    email
 });
//if it exists throw error
 if (userExists){
    res.status(400);
    throw new Error("user already Exists");
 }

 //else create user with all details 
 const user=await User.create({
    name,
    email,
    password,
 });

 //if user get sucessfully created send the data with sucess status code of 201 and all queries in json format
 if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        pic:user.pic,
        token:genrateToken(user._id)
    })
 }
 // if not throw the error
 else{
   res.status(400);
   throw new Error("Error occured!");
 }
})
//login api 
// asyn handler-Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}=req.body; //requesting all of these from user
    const user=await User.findOne({email});
     //if with that name user exists in database and password matched with it then sends the data
    if (user && (await user.matchPassword(password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genrateToken(user._id),
            pic:user.pic,
        })
    }
    else{
        res.status(400);
        throw new Error ("Invalid Email or password");
    }
})
module.exports={registerUser , loginUser };