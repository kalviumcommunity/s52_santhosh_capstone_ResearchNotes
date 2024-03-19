const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (res,userId,expiry=null) => {
    const accessToken = jwt.sign({ _id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      })

    const refreshToken = jwt.sign({ _id: userId }, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: expiry ? expiry : process.env.REFRESH_TOKEN_EXPIRY,
      })

      res.cookie('accessToken', accessToken, {
        maxAge: 3600000 * 24 * 30,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        maxAge: 3600000 * 24 * 30,
        httpOnly: true,
      });
}


module.exports={generateToken}