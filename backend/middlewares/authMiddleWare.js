//its just a middleware to protect so it first verifies the user ad token then send the api notes
// the purpose of this is to user need to pass this iddleware to reah get notes api
const jwt =require("jsonwebtoken");

const User=require("../models/userModels");

const asyncHandler=require("express-async-handler");

const protect=asyncHandler(async(req,res,next)=>{
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

});

//get single notes by id


module.exports={protect};

