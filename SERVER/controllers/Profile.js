const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const { uploadFileToCloudinary } = require('../utils/cloudinaryFileUpload');

//controlelr for creating profile or in other terms adding additional details to the user data
//but here wew ill be just updating the profile as we have already created a profile while creating a user and thhat  profile had null data

exports. updateProfile = async (req,resp) => {
    try{
        //fetch data
        const {dateOfBirth="", about="", contactNo, gender} = req.body;
        //fetch userid
        const userId = req.user.id;
        //validate
        if(!contactNo || !gender){
            return resp.status(403).json({
                success: false,
                message:'all fields are required'
            })
        }
        //find user and find profile  id from user data
        const user = await User.findById(userId);
        const profileId = user.additionalDetails;
        //find profile and update that
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, {dateOfBirth, about, contactNo, gender}, {new:true});
        console.log('updated profile looks like :- ', updatedProfile);

          // Find the updated user details
    const updatedUserDetails = await User.findById(userId)
    .populate("additionalDetails")
    .exec()

        //after that return the success response
        return resp.status(200).json({
            success: true,
            message: 'profile updated successfully',
            data: updatedProfile,
            updatedUserDetails
        })

    }catch(err){
        console.log('error occurred while updating profile:- ', err.message);
        return resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}


//controllers for delete account


exports. deleteAccount = async(req, resp) => {
//TODO:- FIND MORE ON JOB SCHEDULE
//const job = schedule.scheduleJob("10 * * * * *", function(){
//    console.log("the answer to life, the universe and everything!!!");
//                                                              })
// console.log(job);


    try{
      //fetch user id
      const userId = req.user.id;
      //validate
      if(!userId){
        return resp.status(403).jsin({
          success: false,
          message: 'user id is required'
        })
      }
      //check if user exists or not
      const user = await User.findById(userId);
      if(!user){
        return resp.status(404).json({
          success: false,
          message: 'user not found'
        })
      }
      //first delete profile stored in database of this user
      await Profile.findByIdAndDelete(user.additionalDetails);
      //then delete user from all enrolled courses
      const coursesEnrolled = user.courses;
      coursesEnrolled.forEach((course) => {
        //find course and remove user from enrolled users array
         Course.findByIdAndUpdate(course, { $pull: { studentsEnrolled: userId }}, {new:true}).exec();
      });

      //then delete user from database
      await User.findByIdAndDelete(userId);

      //delete course progress
      await CourseProgress.deleteMany({ userId: userId })

      //after that return the success response
      return resp.status(200).json({
        success: true,
        message: 'account deleted successfully'
      })


    }catch(err){
        console.log('error occurred while deleting account:- ', err.message);
        return resp.status(500).json({
          success: false,
          message: 'internal server error',
          error: err.message
        })
  
    }
}


//controllers for fetching all data of user

exports.getAllUserDetails = async(req, resp) => {
    try{
        //fetch user id
        const userId = req.user.id;
        //validate
        if(!userId){
            return resp.status(403).json({
                success: false,
                message: 'user id is required'
            })
        }
        //check if user exists or not
        const user = await User.findById(userId).populate('additionalDetails').populate('courses').exec();
        if(!user){
            return resp.status(404).json({
                success: false,
                message: 'user not found'
            })
        }
        //now return user data with response
        console.log('user data looks like :- ', user);  //you can see additionalDetails and courses in populated fields  (courses are populated as array of course ids)
        
        return resp.status(200).json({
            success: true,
            message: 'user data fetched successfully',
            data: user,
        })
         
        
    }catch(err){
        console.log('error occurred while fetching user data:- ', err.message);
        return resp.status(500).json({
          success: false,
          message: 'internal server error',
          error: err.message
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadFileToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


//ADDED IN LATER STAGE NEEDS REVIEW AND REVISION [UNDERSTAND THESE CLEARLY]

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = Course.studentsEnroled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}