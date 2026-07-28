import mongoose from "mongoose";
import logger from '../utils/logger.js'

    const connectDB = async ()=>{
    try {
        
   const response = await mongoose.connect(process.env.DB_URL)
logger.info(`Data base connected ${response.connection.host}`)

    } catch (error) {
        logger.error(`data base connection error:${error}`)
        process.exit(1)
        
    }
}

export default connectDB