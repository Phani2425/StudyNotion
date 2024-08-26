const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const {sendEmail} = require('../utils/mailSender');

//route handler for creating resetPasswordToken
exports.CreateResetToken = async (req, resp) => {
    try {
        //fetch email from req
        const { email } = req.body;
        //validate email and check wheather the email is registered or not
        if (!email) {
            return resp.status(401).json({
                success: false,
                message: 'email field is empty',
            })
        }
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
            return resp.status(404).json({
                success: false,
                message: 'user is not  registered',
            })
        }
        //create token by using "uuid" package 
        const token = uuidv4();


        // update the token and the expiry time in the user model

        const response = await User.findOneAndUpdate({email: email},{token: token,resetPasswordExpires:Date.now() + 5 * 60 * 1000 },{new:true});

        console.log('printing updated user : -' , response);

        // generate unique  link for user to reset password
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // send email to the user 
        await sendEmail(email, "Reset-Password Link", `For Reseting Your Password Click The Given Link ${resetLink}`);

        return resp.status(200).json({
            success: true,
            data:response,
            message: "Password reset token sent to user's email",
        })


    } catch (err) {
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'Error occurred while sending email for resetting password',
        })
    }
}

//route handler for reseting the Password
exports.ResetPassword = async (req, resp) => {
    try {
        //fetch data
        //frontend ne ye 3 chiz pakad ke body me dala hai
        const {password, confirmPassword, token} = req.body;
        //valiadtion
        if(!password || !confirmPassword){
            return resp.status(403).json({
                success: false,
                message: 'Password and confirm password fields are required',
            })
        }

        //get user details from db using token
        const userExist = await User.findOne({token:token});
        if(!userExist){
            return resp.status(404).json({
                success: false,
                message: 'Token is invalid, user with this token donnot exists',
            })
        }
        //if no entry -> invalid token
        //token time check
        if(userExist.resetPasswordExpires < Date.now()){
            return resp.status(403).json({
                success: false,
                message: 'Token has expired, please generate a new one',
            })
        }
        //compare password

        if(password !== confirmPassword){
            return resp.status(403).json({
                success: false,
                message: 'Password and confirm password do not match',
            })
        }
        //hash Pwd
        const hashedPassword = await bcrypt.hash(password,10);
        // update password
        const updatedUser = await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
        console.log(updatedUser);

        return resp.status(200).json({
            success: true,
            data: updatedUser,
            message: 'Password reset successfully',
        })
        //redirect user to login page or any other page he/she wants to redirect to after resetting password
        //if everything is fine then send response to frontend indicating password reset successful.

    } catch (err) {
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'Error occurred while resetting password',
        })
    }
}