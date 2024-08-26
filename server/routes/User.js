// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    Login,
  Signup,
  GenerateOtp,
  ChangePassword,
} = require("../controllers/Auth")
const {
    CreateResetToken,
    ResetPassword,
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", Login)

// Route for user signup
router.post("/signup", Signup)

// Route for sending OTP to the user's email
router.post("/generateOtp", GenerateOtp)

// Route for Changing the password
router.post("/changepassword", auth, ChangePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", CreateResetToken)

// Route for resetting user's password after verification
router.post("/reset-password", ResetPassword)

// Export the router for use in the main application
module.exports = router