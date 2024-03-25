const express = require("express");
const router = express.Router();
const {handleSignUp, handleValidateOTP, handleLogin, handleAvatarSet} = require('./Controllers/userController')
const tokenAuth = require('./Middleware/auth')
const cookieParser = require('cookie-parser');
const {handleGetNotes,handlePostNote,handleUpdateNote,handleDeleteNote} = require('./Controllers/noteController')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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
router.post('/validate-user', handleValidateOTP)
router.post('/login',handleLogin)

// Auth Middleware (Authorization)
router.use(tokenAuth)   

// user avatar set
router.patch('/avatar-set',upload.single('avatar'),handleAvatarSet)

// Notes Routes (CRUD operations)
router.get('/get-notes',handleGetNotes)
router.post('/post-note',handlePostNote)
router.patch('/update-note/:id',handleUpdateNote)
router.delete('/delete-note/:id',handleDeleteNote)

//exports
module.exports = router;
