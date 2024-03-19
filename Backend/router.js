const express = require("express");
const router = express.Router();
const {handleSignUp, handleValidateOTP, handleLogin} = require('./Controllers/userController')
const tokenAuth = require('./Middleware/auth')
const cookieParser = require('cookie-parser');
const {handleGetNotes} = require('./Controllers/noteController')

// JSON Middleware
router.use(express.json());

// Cookie-parser Middleware
router.use(cookieParser());

// Sample Route
router.get('/', (req, res) => {
    res.send("<h1>Yup! Server is running</h1>");
});

// User Routes
router.post('/signup',handleSignUp)
router.post('/validate-user',handleValidateOTP)
router.post('/login',handleLogin)


// Auth Middleware
router.use(tokenAuth)

// Notes Middleware
router.get('/get-notes',handleGetNotes)

module.exports = router;
