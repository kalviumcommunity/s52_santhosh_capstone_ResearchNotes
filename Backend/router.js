const express = require("express");
const router = express.Router();
const {handleSignUp, activateUser, handleLogin, handleUpdateUser, handleRequestOTP, handleValidateOTP} = require('./Controllers/userController')
const tokenAuth = require('./Middleware/auth')
const cookieParser = require('cookie-parser');
const {handleGetNotes,handlePostNote,handleUpdateNote,handleDeleteNote} = require('./Controllers/noteController')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

// JSON Middleware
router.use(express.json());

// Cookie-parser Middleware
router.use(cookieParser());

// Sample Route
router.get('/', (req, res) => {
    res.send("<h1>Yup! Server is running  🚀 </h1>");
});

// User Routes (Authentication)
router.post('/signup', handleSignUp)
router.post('/activate-user', activateUser)
router.post('/login',handleLogin)

// User-help Routes
router.post('/request-otp',handleRequestOTP)
router.post('/validate-otp',handleValidateOTP)

// user avatar set and update user data
router.patch('/update-user/:id',upload.single('avatar'),handleUpdateUser)

// Auth Middleware (Authorization)
router.use(tokenAuth)   

// Notes Routes (CRUD operations)
router.get('/get-notes',handleGetNotes)
router.post('/post-note',handlePostNote)
router.patch('/update-note/:id',handleUpdateNote)
router.delete('/delete-note/:id',handleDeleteNote)

//exports
module.exports = router;
