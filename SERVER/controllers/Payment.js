const {RpInstance} = require('../config/razorpay');
const User = require('../config/user');
const Course = require('../config/course');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {sendEmail} = require('../utils/mailSender');
const mongoose = require('mongoose');
require('dotenv').config();

exports. capturePayment = async (req,resp) => {
    try{
        //fetch data [courseId and userId]
        const  {courseId} = req.body;
        const userId = req.user.id;
        //validate
        //as i know userId will surely come so i will only check courseId
         if(!courseId){
            return resp.status(403).json({
                success: false,
                message: 'course id is required'
            })
         }
        //valid course details
        const course = await Course.findById(courseId);
        if(!course){
            return resp.status(403).json({
                success: false,
                message: 'course not found'
            })
        }
        //check if the user has already purchased the course and doing it again by mistake
        //but problem is for finding the user id in courseEnrolled field of a course i should have the userId in objectId type
        //but currently i have userId as string...........so first lets convert that
        const uid = new mongoose.Types.ObjectId(userId);
        const isEnrolled = course.studentsEnrolled.includes(uid);
        if(isEnrolled){
            return resp.status(403).json({
                success: false,
                message: 'you have already enrolled for this course'
            })
        }
        //create an order
        const amount = course.price;
        const currency = 'INR';

        const options = {
            amount: amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId: courseId,
                userId: userId
            }
        }

        try{
            //initiate payment using razorpay
           const orderInfo = await RpInstance.orders.create(options);
           console.log(orderInfo);

            //return response
           return resp.status(200).json({
            success: true,
            message: 'payment initiated successfully',
            data: orderInfo,
            orderId:orderInfo.id,
            currency:orderInfo.currency,
            amount:orderInfo.amount,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnaill:course.thumbnail,

           })

        }catch(error){
           console.log("error creating order");
           console.error(err.message);
           return resp.status(500).json({
               success: false,
               message: 'internal server error',
               error: err.message
           })
        }

    }catch(err){
        console.log('error occured while capturing payment: ' + err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
        
    }
}

//controller for verifying the signature
exports. verifySignature = async (req,resp) => {
    try{
        const webHookSecret = process.env.WEB_HOOK_SECRET;
        const signature = req.headers['x-razorpay-signature'];

        //hashing the webHookSecret for matching it with signature
        //step:-1
        const SHAsum = crypto.createHmac('sha256', webHookSecret);
        //step:2
        SHAsum.update(JSON.stringify(req.body));
        //step:-3
        const digest = SHAsum.digest('hex');

    try{
        //now we will match these
        //it have potential of throwing error so we will use try catch block here

        if(digest === signature){
            console.log('signature matched');
            //now we will perform some required actions
            //like updating the course status, sending emails, etc.
            //ye call frontend se nehi razor pay se aa raha hai so ham yaha pe req me kuch bhej nehi sakte
            //tophir userId aur courseId kaha se layenge??? ------yaad karo hamne order create karte wakt notes me userId aur courseId bheja tha .....waha se layenge......
            const {userId, courseId} = req.body.payload.payment.entity.notes;
            //updatin course
            const updatedCourse = await Course.findByIdAndUpdate(courseId, {$push : {studentsEnrolled: userId}}, {new:true});
            console.log(updatedCourse);

            //updating student
            const updatedStudent = await User.findByIdAndUpdate(userId, {$push: {courses : courseId}}, {new:true});
            console.log(updatedStudent);

            // send confiramtion Mail [check it once]
            const mailResponse = await sendEmail(updatedStudent.email, "Course purchased succesfully!",courseEnrollmentEmail(updatedCourse.courseName,updatedStudent.firstName) );
            console.log(mailResponse);

            //for now i will return success
            return resp.status(200).json({
                success: true,
                message: 'signature matched successfully',
                updatedCourse,
                updatedStudent,
                emailResponse: mailResponse,
            })
        }else{
            console.log('signature did not match');
            return resp.status(400).json({
                success: false,
                message: 'signature did not match'
            })
        }
    }catch(err){
       console.log('error occured during signature matching and database updation',err.message);
       resp.status(500).json({
        success: false,
        message: 'internal server error',
        error: err.message
       })
    }

    }catch(err){
        console.log('error occured while verifying signature: ' + err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}