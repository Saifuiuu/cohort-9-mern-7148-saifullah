import express from 'express'
import { getAllNotes,getNote,updateNote,deleteNote,createNote } from '../controllers/noteController.js'
import checkAuth from '../middlewares/authMiddleware.js'
const router=express.Router()

router.use(checkAuth)

router.post('/',createNote)
router.get('/',getAllNotes)
router.get('/:id',getNote)
router.put('/:id',updateNote)
router.delete('/:id',deleteNote)

export default router
