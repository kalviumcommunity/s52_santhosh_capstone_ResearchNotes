const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config();

// Cors Policy Middleware
const allowedOrigins = process.env.CORS_ORIGIN.split(',');
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

// Routes
app.use(router);

//listening
app.listen(PORT, () => {
    console.log('😃 Server is running 🚀 on port', PORT);
});
