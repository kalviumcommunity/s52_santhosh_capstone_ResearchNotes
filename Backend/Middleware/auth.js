const jwt = require('jsonwebtoken')
require("dotenv").config();
const { generateToken } = require("../Utils/token");

const tokenAuth = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || !refreshToken){return res.status(403).json({ error: "Token not exists" })}
  try {
    const decoded = await jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    req.userId = decoded._id;
    next();
  } catch (err) {
    try {
      const decoded = await jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      await generateToken(res, decoded._id, decoded.exp);
      req.userId = decoded._id;
      next();
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: "Invalid refresh token" });
    }
  }
};

//exports
module.exports = tokenAuth;
