const express = require("express");
const router = express.Router();
const {handleSignUp, handleValidateOTP, handleLogin} = require('./Controllers/usercontroller')

// Middleware
router.use(express.json());

// Routes
router.get('/', (req, res) => {
    res.send("<h1>Yup! Server is running</h1>");
});

// user routes
router.post('/signup',handleSignUp)
router.post('/validate-user',handleValidateOTP)
router.post('/login',handleLogin)


module.exports = router;
