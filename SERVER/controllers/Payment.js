const {RpInstance} = require('../config/razorpay');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessEmail');
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
exports. verifyPayment = async (req,resp) => {
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

//ADDED IN LATER STAGE SO IT NEEDS AREVIEW AND REVISION AS IT MIGHT HAVE ERRORS

// // Send Payment Success Email
exports. sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await sendEmail(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await sendEmail(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}




// const { instance } = require("../config/razorpay")
// const Course = require("../models/Course")
// const crypto = require("crypto")
// const User = require("../models/User")
// const mailSender = require("../utils/mailSender")
// const mongoose = require("mongoose")
// const {
//   courseEnrollmentEmail,
// } = require("../mail/templates/courseEnrollmentEmail")
// const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
// const CourseProgress = require("../models/CourseProgress")

// // Capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//   const { courses } = req.body
//   const userId = req.user.id
//   if (courses.length === 0) {
//     return res.json({ success: false, message: "Please Provide Course ID" })
//   }

//   let total_amount = 0

//   for (const course_id of courses) {
//     let course
//     try {
//       // Find the course by its ID
//       course = await Course.findById(course_id)

//       // If the course is not found, return an error
//       if (!course) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Could not find the Course" })
//       }

//       // Check if the user is already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId)
//       if (course.studentsEnroled.includes(uid)) {
//         return res
//           .status(200)
//           .json({ success: false, message: "Student is already Enrolled" })
//       }

//       // Add the price of the course to the total amount
//       total_amount += course.price
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json({ success: false, message: error.message })
//     }
//   }

//   const options = {
//     amount: total_amount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   }

//   try {
//     // Initiate the payment using Razorpay
//     const paymentResponse = await instance.orders.create(options)
//     console.log(paymentResponse)
//     res.json({
//       success: true,
//       data: paymentResponse,
//     })
//   } catch (error) {
//     console.log(error)
//     res
//       .status(500)
//       .json({ success: false, message: "Could not initiate order." })
//   }
// }

// // verify the payment
// exports.verifyPayment = async (req, res) => {
//   const razorpay_order_id = req.body?.razorpay_order_id
//   const razorpay_payment_id = req.body?.razorpay_payment_id
//   const razorpay_signature = req.body?.razorpay_signature
//   const courses = req.body?.courses

//   const userId = req.user.id

//   if (
//     !razorpay_order_id ||
//     !razorpay_payment_id ||
//     !razorpay_signature ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(200).json({ success: false, message: "Payment Failed" })
//   }

//   let body = razorpay_order_id + "|" + razorpay_payment_id

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex")

//   if (expectedSignature === razorpay_signature) {
//     await enrollStudents(courses, userId, res)
//     return res.status(200).json({ success: true, message: "Payment Verified" })
//   }

//   return res.status(200).json({ success: false, message: "Payment Failed" })
// }