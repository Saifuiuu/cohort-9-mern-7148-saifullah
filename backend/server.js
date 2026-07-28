import express from 'express'
import dotenv from 'dotenv'
import  connectDB  from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app=express()

const PORT=process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)



   const startApp=async()=>{
    await connectDB()

    app.listen(PORT,()=>{
    console.log(`server is listening on port:${PORT}`)
})

}

startApp()

