require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const User = require('../models/User');
const { sendEmail } = require('../utils/mailSender');

let userID,courses;

exports. startPayment = async(req,resp) => {
    try{
         
        const {products} = req.body;
        courses = products;
        const {userId} = req.body; 
        userID = userId;

        const lineItem = products.map((product) => {
            return {
                price_data:{
                   currency:'inr',
                   product_data:{
                      name:product.courseName
                   },
                   unit_amount: product.price*100
                },
                quantity:1
            }
        })

        const session = await stripe.checkout.sessions.create({
            mode:'payment',
            payment_method_types:['card'],
            line_items:lineItem,
            success_url:'https://study-notion-frontend-nine-sable.vercel.app/dashboard/enrolled-courses',
            cancel_url:'https://study-notion-frontend-nine-sable.vercel.app/dashboard/cart'
        })

        resp.json({id:session.id});

    }catch(err){
        console.log('error occured  while starting payment:- ',err.message);
        console.error(err.message);
        return resp.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports .  verifySignature = async(req, resp) => {
    
        const signature = req.headers['stripe-signature'];
        let event;
    try{
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    }catch(err){
        console.log('error occured while verifying signature:- ', err.message);
        console.error(err.message);
        return resp.status(500).json({
            success:false,
            message:err.message
        })
    }

    if(event.type === 'payment_intent.succeeded'){

        await enrollStudent(userID,courses,resp);
        resp.json({recieved:true});

    }
    else{
        console.log('unhandled event type');
        return resp.status(400).json({
            success: false,
            message: 'Unhandled event type',
        });
    }

    
}

const enrollStudent = async (userID,courses,resp) => {
    console.log('userId is: -', userID);
    console.log('courses are: -', courses);
    try{
       const user = await User.findById(userID);

       courses.forEach(async (course) => {
        if(course.studentsEnrolled.includes(user._id)){
            console.log(`user is already enrolled in the course having coourseId : - ${course._id}`);
            return;  //if user is already enrolled, skip this course and continue with the next one.
        }
        else{
           const updatedCourse =  await Course.findByIdAndUpdate(course._id,{$push : {studentsEnrolled : userID}}, {new:true});
           if(!updatedCourse){
            console.log('course not found');
           }
           console.log('updated course after enrolling looks like:- ', updatedCourse);
           const Progress = await CourseProgress.create({
             courseID:updatedCourse._id,
             userId: userID,
             completedVideos: [],
           })
           const updatedUser = await User.findByIdAndUpdate(userID, {$push: {courses : course._id, courseProgress : Progress._id}}, {new:true});
           console.log("Enrolled student: ", updatedUser)

           //sending mail to the user
           const mailresponse = await sendEmail(updatedUser.email, 'Course Enrollment Confirmation', courseEnrollmentEmail(course.courseName, updatedUser.firstName));

           if(!mailresponse){
            console.log('mail couldnot be sent');
           }

        }
       })


    }catch(err){
        console.log('error occured while enrolling student in courses:- ',err.message);
        console.error(err.message);
    }
}

