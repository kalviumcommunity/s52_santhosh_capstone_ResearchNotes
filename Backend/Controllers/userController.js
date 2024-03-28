const userModel = require('../Models/userModel')
const {sendOTP} = require('../Utils/mail')
const { hashPassword, comparePassword } = require('../Utils/bcrypt');
const jwt = require("jsonwebtoken");
const {generateToken} = require('../Utils/token')
const {avatarUpload} = require('../Utils/avatar')

require("dotenv").config()

const handleSignUp = async (req,res) => {
    if (!req.body) {
    return res.status(400).json({ error: "No email or password provided" });
  }
      const { username , email, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.status(409).json({error:"Email already exists"});
      }
    
      const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

      await sendOTP(email,otp)

      const hashedPassword = await hashPassword(password)

      const token = jwt.sign({email,password:hashedPassword, username,otp}, process.env.JWT_OTP_SECRET,{
        expiresIn: "5m",
      });
  
      return res.status(200).json({token})
}


const activateUser = async (req,res) => {
  if (!req.body) {
    return res.status(400).json({ error: "No request body found" });
  }
      const  {submittedOTP,token } = req.body
       jwt.verify(token, process.env.JWT_OTP_SECRET,async (err,decoded)=>{
        if(err){
          return res.status(400).json({error:'OTP expired please signup again'})
        }
        if(Number(decoded.otp) === Number(submittedOTP)){
          try{
            const data =  await userModel.create({
              username: decoded.username,
              email: decoded.email,
              password: decoded.password,
              profile: "",
            });
            await generateToken(res,data._id)
            const {username,email,profile, createdAt,updatedAt} = data
            return res.status(200).json({message:'Signup successfully',data:{username,email,profile, createdAt,updatedAt}})
          }catch(err){
            console.log(err)
            return res.status(400).json({error:err.message})
          }
        }else{
          return res.status(401).json({error:'Invalid otp'})
        }
    })
}


const handleLogin = async (req,res) => {
  if (!req.body) {
    return res.status(400).json({error:"No request body found"});
  }
  const { email, password } = req.body;
  try {
    const data = await userModel.findOne({ email });
    if (!data) {
      return res.status(401).json({error:"Cannot find your account"});
    }
    const compare = await comparePassword(password, data.password);
    if(compare){
      await generateToken(res,data._id)
      const {username,email,profile,createdAt,updatedAt} = data
      return res.status(200).json({message:'Login successfully',data:{username,email,profile,createdAt,updatedAt}})
    }else{
      return res.status(403).json({error:'Incorrect password'}); 
    }
  }catch(err){
    console.log(err.message)
    return res.status(401).json({error:err.message}); 
  }

}


const handleUpdateUser = async (req, res) => {
  try {
    const userId = req.userId || req.body._id;
    const updateFields = req.body || {}

    if (req.file) {
      const avatarURL = await avatarUpload(req.file.buffer, userId);
      updateFields.profile = avatarURL;
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    const { username, email, profile, createdAt, updatedAt } = updatedUser;
    res.status(200).json({
      message: 'Updated successfully',
      data: { username, email, profile, createdAt, updatedAt }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update user' });
  }
};


const handleRequestOTP = async (req,res) => {
  const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  try {
    const {email} = req.body
    const data = await userModel.findOne({ email });
    if (!data) {
      return res.status(401).json({error:"Cannot find your account"});
    }
    await sendOTP(email,otp)
    const token = jwt.sign({otp,_id:data._id}, process.env.JWT_OTP_SECRET,{
      expiresIn: "5m",
    });
    return res.status(200).json({token})
  }catch(err){
    return res.status(400).json({error:err.message}); 
  }
}


const handleValidateOTP = async (req,res) => {
  const  {submittedOTP,token } = req.body
  jwt.verify(token, process.env.JWT_OTP_SECRET,async (err,decoded)=>{
    if(err){
      return res.status(400).json({error:'OTP expired please request new one'})
    }
    if(Number(decoded.otp) === Number(submittedOTP)){
      return res.status(200).json({_id:decoded._id})
    }else{
      return res.status(401).json({error:'Invalid otp'})
    }
  })
}


module.exports={handleSignUp, activateUser, handleLogin, handleUpdateUser, handleRequestOTP, handleValidateOTP}