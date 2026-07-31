import express from 'express'
import dotenv from 'dotenv'
import  connectDB  from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import logger from './utils/logger.js'
import noteRoutes from './routes/noteRoutes.js'

dotenv.config()

const app=express()

const PORT=process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/note',noteRoutes)



   const startApp=async()=>{
    try {
         await connectDB()

    app.listen(PORT,()=>{
    console.log(`server is listening on port:${PORT}`)
    })
    } catch (error) {
        logger.error(`Error while starting server :${error}`)
        
    }
   


}

startApp()

