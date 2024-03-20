const noteModel = require('../Models/noteModel')

const handleGetNotes = async (req,res) => {
    try{
        const userId =  req.userId;
        const notes = await noteModel.find({writer:userId})
        res.status(200).send(notes)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}


const handlePostNote = async (req,res) => {
    if(!req.body) return res.status(400).json({error:'No request body found'})
    try{
        const userId =  req.userId;
        const {title,content} =req.body
        const note = await noteModel.create({title,content,writer:userId})
        res.status(200).send(note)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const handleUpdateNote = async (req,res) => {
    if(!req.body) return res.status(400).json({error:'No request body found'})
    const updateFields = {};
    if (req.body.title) updateFields.title = req.body.title;
    if (req.body.content) updateFields.content = req.body.content;
    try{
        const note = await noteModel.findByIdAndUpdate(req.params.noteId, updateFields, { new: true });
        res.status(200).send(note)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}


const handleDeleteNote = async (req, res) => {
    try {
        const deletedNote = await noteModel.findByIdAndDelete(req.params.noteId);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//exports
module.exports = {handleGetNotes,handlePostNote,handleUpdateNote,handleDeleteNote}