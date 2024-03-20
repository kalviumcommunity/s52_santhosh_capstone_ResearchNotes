const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    profile:{
        type: String,
    },
    email:{
        type:String,
        required:true
      },
    password:{
        type:String,
        required:true
      }
},{timestamps:true})
 
//exports
module.exports = mongoose.model('user',userSchema)