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
          return res.status(400).json({error: 'OTP expired, please request a new one'})
        }
        if(Number(decoded.otp) === Number(submittedOTP)){
          try{
            const data =  await userModel.create({
              username: decoded.username,
              email: decoded.email,
              password: decoded.password,
              profile: "",
            });
            let accessToken = await generateToken(data._id)
            const {username,email,profile, createdAt,updatedAt, _id} = data
            return res.status(200).json({message:'Signup successfully',data:{username,email,profile, createdAt,updatedAt, _id, accessToken}})
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
      let accessToken = await generateToken(data._id)
      const {username,email,profile,createdAt,updatedAt, _id} = data
      return res.status(200).json({message:'Login successfully',data:{username,email,profile,createdAt,updatedAt, _id, accessToken}})
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
    const updateFields = {...req.body} || {}
    
    if (req.file) {
      const avatarURL = await avatarUpload(req.file.buffer, req.params.id);
      updateFields.profile = avatarURL;
    }

    if (updateFields.password) {
      const hashedPassword = await hashPassword(updateFields.password);
      updateFields.password = hashedPassword;
    }
    let accessToken = await generateToken(req.params.id)

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    
    const { username, email, profile, createdAt, updatedAt, _id } = updatedUser;
    res.status(200).json({
      message: 'Updated successfully',
      data: { username, email, profile, createdAt, updatedAt, _id, accessToken }
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update user' });
  }
};


const handleRequestOTP = async (req,res) => {
  try {
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
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

const handleValidateOTP = async (req, res) => {
  try {
    const { submittedOTP, token } = req.body;

    if (!submittedOTP || !token) {
      return res.status(400).json({ error: "Token or otp not found" });
    }

    jwt.verify(token, process.env.JWT_OTP_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ error: 'OTP expired, please request a new one' });
      }
      if (Number(decoded.otp) === Number(submittedOTP)) {
        return res.status(200).json({ _id: decoded._id });
      } else {
        return res.status(401).json({ error: 'Invalid OTP' });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const handleGetUserData = async (req, res) => {
  try{
    const userId =  req.userId;
    const data = await userModel.findById(userId)
    res.status(200).json({data})
  }catch(err){
    res.status(400).json({error:err.message})
  }
}
 
const handleGoogleAuth = async (req, res) => {
  try{
    if (!req.body) {
      return res.status(400).json({ error: "No email or password provided" });
    }
      const { google_username , google_email, google_profile } = req.body;
      let data = await userModel.findOne({ email: google_email });
      if (!data) {
          data =  await userModel.create({
          username: google_username,
          email: google_email,
          password: "Google-Auth",
          profile: google_profile,
        });
      }
    let accessToken = await generateToken(data._id)
    const {username,email,profile, createdAt,updatedAt, _id} = data
    return res.status(200).json({message:'login successfully',data:{username,email,profile, createdAt,updatedAt, _id, accessToken}})
  }catch(err){
    console.log(err)
    res.status(400).json({error:"Something went wrong"})
  }
}

module.exports={handleSignUp, activateUser, handleLogin, handleUpdateUser, handleRequestOTP, handleValidateOTP, handleGetUserData, handleGoogleAuth}