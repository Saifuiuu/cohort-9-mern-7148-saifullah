import express from 'express'
import logger from '../utils/logger.js'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'



 const checkAuth=async (req,res,next)=>{
    try {
        
        const token=req.cookies.token

        if(!token){
            return res.status(401).json({message:"User is not Authorized !"})
        }

        let decoded= jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
             return res.status(401).json({message:"token is changed !"})
        }

        req.user= await User.findById(decoded.id).select('-password')

        if(!req.user){
            return res.status(401).json({message:"User  not found!"})
        }

        next()


    } catch (error) {
        logger.error(`Auth middleware error :${error}`)
        res.status(401).json({message:"Not authorize"})
    }
}

export default checkAuth