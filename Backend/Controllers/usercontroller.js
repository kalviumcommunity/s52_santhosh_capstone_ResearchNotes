const userModel = require('../Models/userModel')
const {sendOTP} = require('../mail')
const { hashPassword, comparePassword } = require('../bcrypt');
const jwt = require("jsonwebtoken");

const handleSignUp = async (req,res) => {
    if (!req.body && !req.body.email && !req.body.password) {
        return res.status(204).send("No request body found");
      }
      const { username, profile, email, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.status(409).send("Email already exists");
      }
      const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

      await sendOTP(email,otp)

      const hashedPassword = await hashPassword(password)
      const userData = {email,password:hashedPassword, username,profile,otp}

      const token = jwt.sign(userData, process.env.JWT_SECRET,{
        expiresIn: "5m",
      });
  
      return res.status(200).send(token)
}


const handleValidateOTP = async (req,res) => {
  if (!req.body) {
    return res.status(204).send("No request body found");
  }
      const  {submittedOTP,token} = req.body

      await jwt.verify(token, process.env.JWT_SECRET,async (err,decoded)=>{
        if(err){
          console.log(err)
          return res.status(400).send(err.message)
        }
        if(decoded.otp === submittedOTP){
          try{
          const data =  await userModel.create({
              username: decoded.username,
              email: decoded.email,
              password: decoded.password,
              profile: decoded.profile,
            });
            return res.status(200).send('Signup successfully')
          }catch(err){
            console.log(err)
            return res.status(400).send(err.message)
          }
        }else{
          return res.status(401).send('Invalid otp')
        }
    })
}


const handleLogin = async () => {
  if (!req.body) {
    return res.status(204).send("No request body found");
  }
  const { email, password } = req.body;
  try {
    const data = await userModel.findOne({ email });
    if (!data) {
      return res.status(401).send("Cannot find your account");
    }

    const compare = await comparePassword(password, data.password);
    if(compare){

    }else{
      return res.status(403).send('Incorrect password'); 
    }
  }catch(err){
    console.log(err)
    return res.status(401).send(err.message); 
  }

}




module.exports={handleSignUp, handleValidateOTP, handleLogin}