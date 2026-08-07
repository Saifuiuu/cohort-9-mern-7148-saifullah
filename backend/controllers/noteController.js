import Note from "../models/Note.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";



const findUserNote =async(noteId,userId)=>{
  try{
  if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return {error: "Invalid id"};
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return { error: 'Not found' };}

    if (note.user.toString()!==userId.toString()){
      return{ error:'Not authorize' }}
    return { note };}
    catch(error){
      logger.error(`FinduserNOte Error:${error}`)
      throw error;
    }
};



export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and Content both are required " });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    logger.info(`Note created successfully by user :${req.user._id}`);
    return res.status(201).json(note);
  } catch (error) {
    logger.error(`Error while note creation :${error}`);
    res.status(500).json({ message: "Error while note creation" });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(notes);
  } catch (error) {
    logger.error(`Error while getting all notes :${error}`);
    res.status(500).json({ message: "Server error while getting all notes" });
  }
};

export const getNote =async (req, res)=>{
  try {
    const {note,error} = await findUserNote(req.params.id, req.user._id);
    if (error === "Invalid id") {
    return res.status(400).json({ message: "Invalid note id" });
}
if (error === "Not found") {
    return res.status(404).json({ message: "Note not found" });
}

     if(error==='Not found') {
      return res.status(404).json({message:'Note not found'});}

  if(error==='Not authorize') {
      return res.status(403).json({message:' not authorized to access this note'});}
 
    res.status(200).json(note)
   
  } catch (error) {
     logger.error(`Error while finding note ${error}`)
     return res.status(500).json({message:`server eror while getNote `})
  }
};

export const updateNote= async(req,res)=>{
    try {
        
        const {note,error} = await findUserNote(req.params.id, req.user._id);

        if (error === "Invalid id") {
    return res.status(400).json({ message: "Invalid note id" });
}


     if(error==='Not found') {
      return res.status(404).json({message:'Note not found'});}

  if(error==='Not authorize') {
      return res.status(403).json({message:' not authorized to update this note'});}

    
        if(req.body.title!==undefined){
    note.title = req.body.title;}

if(req.body.content!==undefined){
    note.content = req.body.content;}

if(req.body.title!==undefined&&req.body.title.trim()===""){
    return res.status(400).json({
        message:"Title cannot be empty"
    });
}
if(req.body.content!==undefined&&req.body.content.trim()===""){
    return res.status(400).json({
        message:"Content cannot be empty"
    });
}



        const updatedNote=await note.save()

        logger.info(`Updated noted id:${note._id}`)
        res.status(200).json(updatedNote)
    } catch (error) {

          logger.error(`Update note error: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
}


export const deleteNote= async(req,res)=>{
    try {
        const {note,error} = await findUserNote(req.params.id, req.user._id);
        if (error === "Invalid id") {
    return res.status(400).json({ message: "Invalid note id" });
}

     if(error==='Not found') {
      return res.status(404).json({message:'Note not found'});}

  if(error==='Not authorize') {
      return res.status(403).json({message:' not authorized to delete this note'});}

           await note.deleteOne()

        return res.status(200).json({message:"Note deleted successfully "})

    } catch (error) {
         logger.error(`Delete note error: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
    
}