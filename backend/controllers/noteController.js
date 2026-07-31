import Note from "../models/Note.js";
import logger from "../utils/logger.js";

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
    const note =await Note.findById(req.params.id);

    if (!note) {

        return res.status(404).json({message:"Note not found "})
    }

    if(note.user.toString()!==req.user._id.toString()){
        return res.status(404).json({message:"Not authorized to access this "})
    }

    res.status(200).json(note)
   

  } catch (error) {
     logger.error(`Error while finding note ${error}`)
     return res.status(500).json({message:`server eror while getNote `})
  }
};

export const updateNote= async(req,res)=>{
    try {
        
        const note= await Note.findById(req.params.id)

        if(!note){
            return res.status(404).json({message:"Note not found "})
        }


        if(note.user.toString() !== req.user._id.toString()){
            return res.status(404).json({message:"Not authorized to access this  "})
        }


        note.title=req.body.title || note.title
        note.content=req.body.content || note.content

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
        const note= await Note.findById(req.params.id)

         if(!note){
            return res.status(404).json({message:"Note not found "})
        }


        if(note.user.toString() !== req.user._id.toString()){
            return res.status(404).json({message:"No authorize to delete this "})
        }

        await note.deleteOne()

        return res.status(200).json({message:"Note deleted successfully "})

    } catch (error) {
         logger.error(`Delete note error: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
    
}