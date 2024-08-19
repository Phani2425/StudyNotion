const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');
const { uploadFileToCloudinary } = require('../utils/cloudinaryFileUpload');
require('dotenv').config();

//controller for creation  of a course

exports. CreateCourse = async(req,resp) => {
  try{
    //fetch data
    const {courseName ,courseDescription, whatYouWillLearn, price, category } = req.body;
    //fetch image data
    const thumbnail = req.files.thumbnailImage;
    //validate data
    if(!courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail){
        return resp.status(403).json({
            success: false,
            message:'all fields are required',
        })
    }
    //check given category is valid or not
    const existingCategory = await Category.findById(category);
    if(!existingCategory){
        return resp.status(404).json({
            success: false,
            message:'given category is not valid',
        })
    }
    //upload the thuumbnail to cloudinary
    const fileUploadResponse = await uploadFileToCloudinary(thumbnail, process.env.CLOUDINARY_FOLDER);
    //before making db entry in user model fetch the user id from the req object inserted by the authentication middleware by doing: req.user = decoded
    const userId = req.user.id;
    
    //make db entry in Course model
    const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor: userId,
        whatYouWillLearn,
        price,
        thumbnail:fileUploadResponse.secure_url,
        category:existingCategory._id,
    });
    console.log(newCourse);

    //make db entry in User model
    const response = await User.findByIdAndUpdate(userId, {$push : {courses: newCourse._id}},{new:true}).populate('courses').exec(); 
    console.log(response);

    //make db entry in Category model
    const courseInCategory = await Category.findByIdAndUpdate(category, {$push : {course : response._id}}, {new:true}).populate('course').exec();
    console.log(courseInCategory);
    
    //return response 
    resp.status(200).json({
        success: true,
        message:'new course created successfully',
        data: newCourse
    })

  }catch(err){
    console.log('error occured during course creation',err.message);
    console.error(err.message);
    resp.status(500).json({
      success: false,
      message: 'internal server error',
      error: err.message
    })
  }
}

//controller for fetching all courses
exports. GetAllCourses = async (req, resp) => {
    try{
        const allCourse = await Course.find({},{
                                                courseName: true,
                                                courseDescription: true,
                                                instructor: true,
                                                whatYouWillLearn: true,
                                                courseContent: true,
                                                ratingAndReview: true,
                                                price: true,
                                                thumbnail: true,
                                                category: true,
                                            });

        return response.status(200).json({
            success: true,
            message:'all courses fetched successfully',
            data: allCourse
        }) 

    }catch(err){
        console.log('error occured during fetching all courses',err.message);
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}
