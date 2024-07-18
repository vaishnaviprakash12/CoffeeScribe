//handling all the errors of middlewares

//if we write the route that doesnot exists then this function will call
//error will be not found-then the requested url name
const notFound=(req,res,next)=>{
    const error=new Error(`not Found- ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// general errors 
//first it will see the error then convert it into json structure
//this is basically for handling errors and present in an structure
//if we don't use it then error we got will represnented in html document

const errorHandler=(err,req,res,next)=>{

    const statusCode=res.statusCode===200?500:res.statusCode;
    res.status(statusCode);

    res.json({
        message:err.message,
        stack:process.env.NODE_ENV === "production" ? null :err.stack,
    })

}


module.exports= {notFound,errorHandler} ;