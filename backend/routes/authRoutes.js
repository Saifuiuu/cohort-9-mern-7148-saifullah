import express from 'express'
import { login, logout, profile, signup } from '../controllers/authController.js'
import checkAuth from '../middlewares/authMiddleware.js'

const router=express.Router()

router.post('/login',login)
router.post('/signup',signup)
router.post('/logout',logout)
router.get('/profile',checkAuth,profile)

export default router