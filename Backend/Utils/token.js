const jwt = require("jsonwebtoken");
require("dotenv").config();
const util = require('util');

// generating access & refresh token and setting on cookie

const generateToken = async (userId) => {
  const jwtSign = util.promisify(jwt.sign);
  try {
    const accessToken = await jwtSign({ _id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET, 
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
   
      // res.cookie('accessToken', accessToken, {
      //   maxAge: 3600000 * 24 * 30,  // 30 days
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      //   // domain: '.onrender.com', 
      // });
      
      // res.cookie('refreshToken', refreshToken, {
      //   maxAge: 3600000 * 24 * 30,  // 30 days
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      //   // domain: '.onrender.com', 
      // });

      return accessToken;
      
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw error;
  }
};


//exports
module.exports={generateToken}