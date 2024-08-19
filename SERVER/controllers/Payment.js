const {RpInstance} = require('../config/razorpay');
const User = require('../config/user');
const Course = require('../config/course');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {sendEmail} = require('../utils/mailSender');
const mongoose = require('mongoose');

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

        }catch(error){

        }
        //return response

    }catch(err){
        console.log('error occured while capturing payment: ' + err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
        
    }
}