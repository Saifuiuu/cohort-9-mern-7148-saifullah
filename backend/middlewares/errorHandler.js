import logger from "../utils/logger.js";

const errorHandler=(err,req,res,next)=>{

    logger.error(`${err.mesage} ${req.method} ${req.originalUrl}`)
    res.status(err.statusCode||500).json({
        success:false,
        message:err.message || ` Internal server Error `,

    });
    
};

export default errorHandler;