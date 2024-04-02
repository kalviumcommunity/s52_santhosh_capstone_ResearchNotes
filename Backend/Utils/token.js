const jwt = require("jsonwebtoken");
require("dotenv").config();
const util = require('util');

// generating access & refresh token and setting on cookie

const generateToken = async (res, userId, expiry = null) => {
  const jwtSign = util.promisify(jwt.sign);
  try {
    const accessToken = await jwtSign({ _id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET, 
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    const refreshToken = await jwtSign({ _id: userId }, process.env.JWT_REFRESH_TOKEN_SECRET, 
      { expiresIn: expiry ? expiry : process.env.REFRESH_TOKEN_EXPIRY });

    res.cookie('accessToken', accessToken, {
      maxAge: 3600000 * 24 * 30,  //30 days
      httpOnly: true,
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: 3600000 * 24 * 30,  //30 days
      httpOnly: true,
    });
  } catch (error) {
    console.error('Error generating tokens:', error);
    throw error;
  }
};


//exports
module.exports={generateToken}