
// const User = require('../models/User');
// const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessEmail');
// const {sendEmail} = require('../utils/mailSender');
// require('dotenv').config();

// //New code for payment for multiple products

// exports. capturePayments = async(req,resp) => {

//    const {courses} = req.body;
//    const {userId} = req.user;

//    if(courses.length === 0){
//     return response.status(404).json({
//       success: false,
//       message: 'No courses selected for payment'
//     })
//    }

//    let totalAmount = 0;

//    for(const course_id of courses){
//     let course;
//     try{
//       course = await Course.findById(course_id);
//       if(!course){
//         return response.status(404).json({
//           success: false,
//           message: `Course not found with id: ${course_id}`
//         })
//       }

//       //if we got the course the first ii hhave to check if the student is not already enrolled in the course
//       const uid = new mongoose.Types.ObjectId(userId);
//       if(course.studentsEnrolled.includes(uid)){
//         return response.status(403).json({
//           success: false,
//           message: `Student is already enrolled in course: ${course_id}`
//         })
//       }
//       //agar sab sahi raha to total amount cal karlo
//       totalAmount += course.price;
//     }catch(err){
//       console.error(err.message);
//       return resp.status(500).json({
//         success: false,
//         message: 'Internal server error',
//         error: err.message
//       })
//     }
//    }

//    const options = {
//     amount:totalAmount*100,
//     currency:'INR',
//     reciept: Math.random( Date.now()).toString(),
//    }

//    //now using this option we will create our order
//    try{

//     const orderInfo = await RpInstance.orders.create(options);

//     console.log('orderInfo  is: -' , orderInfo);

//     resp.status(200).json({
//       success:true,
//       message: 'Order created successfully',
//       data: orderInfo
//     })

//    }catch(err){
//        console.log('error occured during order creation in payment section : -', err)
//        console.error(err);
//        return resp.status(500).json({
//            success: false,
//            message: 'Internal server error',
//            error: err
//        })
//    }

// }


// exports. verifyPayment = async(req, resp) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const courses = req.body?.courses;
//     const {userId} = req.user;

//     //validation
//     if(!razorpay_signature || !courses || !razorpay_payment_id || !razorpay_order_id || !userId){
//       resp.status(400).json({
//         success: false,
//         message: 'All fields are required and your payment failed....'
//       })
//     }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

//     if(expectedSignature === razorpay_signature){
//       //enroll kardo student ko

//       await enrollStudents(courses, userId, resp);

//       //return resp
//       return resp.status(200).json({
//         success: true,
//         message: 'Payment verified',
//         data: {
//           userId: userId,
//           courses: courses
//         }
//       })
//     }

//     //else
//     return resp.status(400).json({
//       success: false,
//       message: 'Payment verification failed',

//     })
// }


// // enroll the student in the courses
// const enrollStudents = async (courses, userId, res) => {
//   if (!courses || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Course ID and User ID" })
//   }

//   for (const courseId of courses) {
//     try {
//       // Find the course and enroll the student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         { _id: courseId },
//         { $push: { studentsEnrolled: userId } },
//         { new: true }
//       )

//       if (!enrolledCourse) {
//         return res
//           .status(500)
//           .json({ success: false, error: "Course not found" })
//       }
//       console.log("Updated course: ", enrolledCourse)

//       const courseProgress = await CourseProgress.create({
//         courseID: courseId,
//         userId: userId,
//         completedVideos: [],
//       })
//       // Find the student and add the course to their list of enrolled courses
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//             courseProgress: courseProgress._id,
//           },
//         },
//         { new: true }
//       )

//       console.log("Enrolled student: ", enrolledStudent)
//       // Send an email notification to the enrolled student
//       const emailResponse = await sendEmail(
//         enrolledStudent.email,
//         `Successfully Enrolled into ${enrolledCourse.courseName}`,
//         courseEnrollmentEmail(
//           enrolledCourse.courseName,
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//         )
//       )

//       console.log("Email sent successfully: ", emailResponse.response)
//     } catch (error) {
//       console.log(error)
//       return res.status(400).json({ success: false, error: error.message })
//     }
//   }
// }


//ADDED IN LATER STAGE SO IT NEEDS AREVIEW AND REVISION AS IT MIGHT HAVE ERRORS

// // Send Payment Success Email
// exports. sendPaymentSuccessEmail = async (req, res) => {
//   const { orderId, paymentId, amount } = req.body;

//   const userId = req.user.id

//   if (!orderId || !paymentId || !amount || !userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all the details" })
//   }

//   try {
//     const enrolledStudent = await User.findById(userId);

//     await sendEmail(
//       enrolledStudent.email,
//       `Payment Received`,
//       paymentSuccessEmail(
//         `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//         amount / 100,
//         orderId,
//         paymentId
//       )
//     )
//   } catch (error) {
//     console.log("error in sending mail", error)
//     return res
//       .status(400)
//       .json({ success: false, message: "Could not send email" })
//   }
// }
