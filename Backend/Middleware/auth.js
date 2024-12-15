const jwt = require('jsonwebtoken')
require("dotenv").config();
// const { generateToken } = require("../Utils/token");

const tokenAuth = async (req, res, next) => {
  const accessToken = req?.headers?.authorization || false;
  // console.log(req.headers)

  if (!accessToken){return res.status(403).json({ error: "Token not exists" })}
  try {
    const decoded = await jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET
    );
    req.userId = decoded._id;
    next();
  } catch (err) {
      console.log("error found",err)
      res.status(400).json({ error: "Invalid token" });
  }
};

//exports
module.exports = tokenAuth;
