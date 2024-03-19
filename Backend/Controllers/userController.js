const userModel = require('../Models/userModel')
const {sendOTP} = require('../mail')
const { hashPassword, comparePassword } = require('../bcrypt');
const jwt = require("jsonwebtoken");
const {generateToken} = require('../token')

const handleSignUp = async (req,res) => {
    if (!req.body && !req.body.email && !req.body.password) {
        return res.status(400).json({error:"No request body found"});
      }
      const { username, profile, email, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.status(409).json({eror:"Email already exists"});
      }
      const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

      await sendOTP(email,otp)

      const hashedPassword = await hashPassword(password)

      const token = jwt.sign({email,password:hashedPassword, username,profile,otp}, process.env.JWT_OTP_SECRET,{
        expiresIn: "5m",
      });
  
      return res.status(200).json({token})
}


const handleValidateOTP = async (req,res) => {
  if (!req.body) {
    return res.status(400).json({ error: "No request body found" });
  }
      const  {submittedOTP,token} = req.body

      await jwt.verify(token, process.env.JWT_OTP_SECRET,async (err,decoded)=>{
        if(err){
          console.log(err)
          return res.status(400).json({error:err.message})
        }
        if(decoded.otp === submittedOTP){
          try{
          const data =  await userModel.create({
              username: decoded.username,
              email: decoded.email,
              password: decoded.password,
              profile: decoded.profile,
            });
            await generateToken(res,data._id)
            return res.status(200).json({message:'Signup successfully'})
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

    }else{
      return res.status(403).json({error:'Incorrect password'}); 
    }
  }catch(err){
    console.log(err)
    return res.status(401).json({error:err.message}); 
  }

}




module.exports={handleSignUp, handleValidateOTP, handleLogin}