const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator =  require('otp-generator');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { sendEmail } = require('../utils/mailSender');


//otp generation
exports. GenerateOtp = async (req, resp) => {
    try{
        //fetch the email to which the otp will be sent
        const {email} = req.body;

        if(!email){
            return resp.status(404).json({
                message:'invalid email'
            })
        }
        //check if the email is already registered
        const theuser = await User.findOne({email:email});
        if(theuser){
            return resp.status(401).json({
                success:false,
                message:'user with the email already registered'
            })
        }

        //agar user pehle se registered nehi hai then:-
        const otp = otpGenerator.generate(6,{
            digits:true,
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })

        //check if the otp is uinque
        let result =await OTP.findOne({otp:otp});//used let as the refernece it is refering to going to be changed in future in the loop below

        while(result){
            otp = otpGenerator.generate(6, {
                digits:true,
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })

            result =await OTP.findOne({otp:otp});
        }

        const otpObject = new OTP ({
            email:email,
            otp:otp
        });
        const data = await otpObject.save();
        console.log('printing the otp data:- ',data);

        resp.status(200).json({
            success:true,
            data:data,
            message:'otp generated successfully'
        })

    }catch(err){
        console.log('error occured while otp generation');
        console.error(err.message);
        response.status(500).json({
            success:false,
            messqage: 'error occured while otp generation'
        })
    }
}


//singup controller
exports. Signup = async (req, resp) => {
    try{
        //fetch data from request
        const {firstName, lastName, email, password, confirmPassword, accountType, otp}  = req.body;

        console.log("inside signup controller");
        console.log(firstName, lastName, email, password,confirmPassword, accountType, otp);
        console.log('type of password',typeof password, password.length);
        console.log('type of confirmPassword',typeof confirmPassword, confirmPassword.length);
        

        //validate the data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return resp.status(401).josn({
                success: false,
                message:'invalid information given'
            })
        }

        //check wheather user already registered or not
        const existinguser = await User.findOne({email:email});
        if(existinguser){
            return resp.status(401).json({
                success:false,
                message:'user with the email already registered'
            })
        }
        //validate and match password and confirm password

        if(password !== confirmPassword) {
            console.log(password);
            console.log(confirmPassword);
            
            console.log('password match nehi kar raha dosto');
            return resp.status(401).json({
                success: false,
                message:"password and confirm password do not match"
            })
        }
        //fetch most recent otp generated with the mail of the user from database {as theree can be multiple otps associated with the email of the user}
        const rectentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(rectentOtp);
        //then match the otp from db with the otp entered by user
        //validate otp
        if(rectentOtp.length === 0 || rectentOtp[0].otp != otp){
            console.log('otp match nehi kar raha dosto');
            return resp.status(401).json({
                success: false,
                message:'invalid otp'
            })
        }
    
        //if matched then add the data of user to database(don't forget to hash the password) if not then prompt that otp is incorrect 
        const hashedPassword = await bcrypt.hash(password,10);

        //before creating user data i have to create profile document for the user // although it is not mandatory to do this
        //while creating profile of a user in profile.js controller we can add the _id of created profile in that users additional information field

        //as here we are creating the profile first so there in profile.js controller we will just update the profile from null value to the user entered value
        
        //so we can use any way amoung these two ways for profile creation
        const newProfile = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })


        const newUser = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password: hashedPassword,
            accountType: accountType,
            additionalDetails: newProfile._id,
            courses:[],
            image:`api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
            courseProgress:[],
            
        })

        // return response
        console.log('user ban gaya doston');

        resp.status(200).json({
            success:true,
            data:newUser,
            message:'user is registered successfully'
        })
        

        
    }catch(error){
        console.error(error.message);
        console.log('error yaha pe ho raha:- ', error.message)
        resp.status(500).json({
            success:false,
            message:'internal server error during signing up'
        })
    }
}


//login controller

exports.Login = async(req,resp) => {
    try{
        //fetch data from request ki body
        const {email,password} = req.body;
        //validate data
        if(!email || !password){
            return resp.status(403).json({
                success: false,
                message:'all fields are required'
            })
        }
        //check wheather the user is registerd
        const existingUser = await User.findOne({email:email});
        if(!existingUser){
            return resp.status(401).json({
                success: false,
                message:'user not registered... please sign up first'
            })
        }

        //compare the passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch){
            return resp.status(401).json({
                success: false,
                message:'incorrect password'
            })
        }
        //if matched create jwt token
        const payload = {
            id:existingUser._id,
            email:existingUser.email,
            accountType: existingUser.accountType,
        }

        const token =  jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d' });
      // Save token to user document in database
      existingUser.token = token
      existingUser.password = undefined;//important i forgot that
        //return that with cookies and also return a succesful response

        resp.cookie('mycookie', token, {expires: new Date(Date.now() + 3*24*60*60*1000), httpOnly:true }).status(200).json({
            success:true,
            token:token,
            message:'user logged in successfully',
            user:existingUser
        })//[httpOnly:true] means the token can only be read when it is send with http request... means in server only... it cannot be read in client side.. basically it is done for safety puposes ..beacuse if someone can read it in client side then even if he is unautheticated he will prepare his own fake cookie with the real cookie data and try to access server routes
        //in this way server will not recognise the fake cookie and will allow for access...this is why we dont allow cookies to be redable in client side and make it readable only with http request or in server side...

    }catch(err){
        console.error(err.message);
        return resp.status(500).json({  
            success:false,
            message:'internal server error during login..... please try again'
        })
    }
}

//change password
exports. ChangePassword = async(req, resp) => {
    try{
        //get data from request ki body
        //get old password, new password,confirm new passsword
        const {email,oldpassword, newpassword, confirmnewpassword} = req.body;
        //validation
        if(!email || !oldpassword || !newpassword || !confirmnewpassword){
            return resp.status(403).json({
                success:false,
                message:'all fields are required'
            })
        }
        //fetch the user object from db and match the old password we got from request with the actual password of the user
        const existingUser = await User.findOne({email:email});
        //ek baar ye check karna hai ki kya user bina registet hue password change karne jaa sakta hai

        const isMatch = await bcrypt(oldpassword, existingUser.password);
        if(!isMatch){
            return resp.status(403).json({
                success:false,
                message:'incorrect old password'
            })
        }
        //checking wheather the newpassword and confirmpassword entered by the user is smae or not
        if(newpassword!== confirmnewpassword){
            return resp.status(403).json({
                success:false,
                message:'new password and confirm password do not match'
            })
        }
        
        //update  pwd in db by hashing it
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        existingUser.password = hashedPassword;
        await existingUser.save();

        //send mail about the updated password
        sendEmail(email, 'Your Password for this account has been updated in StudyNotion.. Your new Password is:- ',newpassword );

        //return succes response
        resp.status(200).json({
            success:true,
            message:'password changed successfully'
        })
        
    }catch(err){
      console.log('error occured while changing the password')
      console.error(err.message);
      resp.status(500).jason({
        success:false,
        message:'internal server error during changing the password'
      })

    }
}

