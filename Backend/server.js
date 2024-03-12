const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000

require('dotenv').config()

app.get('/',(req,res)=>{
    res.send('<h1>Server is running!</h1>')
})

app.listen(PORT,()=>{
    console.log('server is running on port',process.env.PORT)
})