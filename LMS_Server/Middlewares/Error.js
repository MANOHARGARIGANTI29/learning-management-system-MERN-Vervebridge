const ErrorMiddleware = (err,req,res,next)=>{
    console.error("ErrorMiddleware:",err)
    err.statusCode=err.statusCode||500;
    err.message=err.message||"Internal Server Error"
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
export default ErrorMiddleware