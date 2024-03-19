const noteModel = require('../Models/noteModel')

const handleGetNotes = async (req,res) => {
    try{
        const userId =  req.userId;
        const notes = await noteModel.find({writer:userId})
        res.status(200).send(notes)
    }catch(err){
        console.log(err)
        res.status(400).json({error:err.message})
    }
}

module.exports = {handleGetNotes}