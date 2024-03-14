const express = require('express')
const mongoose = require('mongoose')
const router = require('./router')

const app = express()
const PORT = process.env.PORT || 4000

require('dotenv').config()

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

app.use(router)

app.listen(PORT,()=>{
    console.log('server is running on port',PORT)
})