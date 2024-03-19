const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 4000

require('dotenv').config()

// Cors Policy Middleware
const allowedOrigins = process.env.CORS_ORIGIN.split(',');

app.use(cors({ origin: allowedOrigins , credentials: true }));


// DataBase Connection Middleware
app.use(async (req, res, next) => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase connected successfully")
        next()
    }catch(error){
        console.log("DataBase connection failed")
        res.send("DataBase connection failed")
    } 
})


//routes
app.use(router)

app.listen(PORT,()=>{
    console.log('😃 server is running 🚀 on port',PORT)
})