class Errorclass extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}


export const errorHandler = (err, req, res, next)=>{
    err.message = err.message || "INTERNAL SERVER ERROR" ;
    err.statusCode = err.statusCode || 500; 
    return res 
        .status(err.statusCode)
        .json({
            succes: false,
            message: err.message,
        })
}

export default Errorclass;
