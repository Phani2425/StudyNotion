const User = require('../models/User');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const Category = require('../models/Category');
const { uploadFileToCloudinary } = require('../utils/cloudinaryFileUpload');
require('dotenv').config();
const {convertSecondsToDuration} = require('../utils/SecToDuration');
const CourseProgress = require('../models/CourseProgress');

//controller for creation  of a course

exports. createCourse = async(req,resp) => {
  try{
    //fetch data
    const {courseName ,courseDescription, whatYouWillLearn, price, category,tag,instructions,status } = req.body;
    //fetch image data
    const thumbnail = req.files.thumbnailImage;
    //validate data
    if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !instructions || !status){
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
        tag,
        instructions,
        status
    });
    console.log(newCourse);

    //make db entry in User model
    const response = await User.findByIdAndUpdate(userId, {$push : {courses: newCourse._id}},{new:true}).populate('courses').exec(); 
    console.log(response);

    //make db entry in Category model
    const courseInCategory = await Category.findByIdAndUpdate(category, {$push : {courses : newCourse._id}}, {new:true}).populate('courses').exec();
    console.log('course pushed to category:- ',courseInCategory);
    
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

//ADDED IN LATER STAGE SO THIS REQUIRE REVIEW AND REVISION [there might be something wrong]

// // Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadFileToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

//controller for fetching all courses
exports. getAllCourses = async (req, resp) => {
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

        return resp.status(200).json({
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

//controller for getting course details where there should not be any object id so i have to poppulater every references
exports. getCourseDetails = async (req, resp) => {
    try{
        //fetch  courseid from the req body
        const {courseId} = req.body;
        //validate
        if(!courseId){
            return resp.status(403).json({
                success: false,
                message: 'course id is required'
            })
        }
        //fetch course details
        const courseDetail  = await Course.findById(courseId).populate(
                                                                    {path:'courseContent', 
                                                                        populate:{path : 'subSection'}
                                                                    }
                                                                )
                                                             .populate({path: 'studentsEnrolled'})
                                                             .populate({path: 'ratingAndReview'})
                                                             .populate({path:'instructor',populate:{path:'additionalDetails'}})
                                                             .populate({path:'category'})
                                                             .exec();

        console.log("printing course details", courseDetail);

        if(!courseDetail){
            return resp.status(404).json({
                success: false,
                message: 'course not found'
            })  
            //404 not found 403 forbidden 401 unauthorized 500 internal server error 200 ok 400 bad request
        }

        return resp.status(200).json({
            success:true,
            courseDetail,
            message:'course details fetched successfully'
        })

    }catch(err){
        console.log("error occured during fetching course detail", err.message);
        console.error(err.message);
        return resp.status(500).json({
            success:false,
            message:'internal server error',
            error: err.message
        })  
    }
}



// // Get One Single Course Details
// // exports.getCourseDetails = async (req, res) => {
// //   try {
// //     const { courseId } = req.body
// //     const courseDetails = await Course.findOne({
// //       _id: courseId,
// //     })
// //       .populate({
// //         path: "instructor",
// //         populate: {
// //           path: "additionalDetails",
// //         },
// //       })
// //       .populate("category")
// //       .populate("ratingAndReviews")
// //       .populate({
// //         path: "courseContent",
// //         populate: {
// //           path: "subSection",
// //         },
// //       })
// //       .exec()
// //     // console.log(
// //     //   "###################################### course details : ",
// //     //   courseDetails,
// //     //   courseId
// //     // );
// //     if (!courseDetails || !courseDetails.length) {
// //       return res.status(400).json({
// //         success: false,
// //         message: `Could not find course with id: ${courseId}`,
// //       })
// //     }

// //     if (courseDetails.status === "Draft") {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Accessing a draft course is forbidden`,
// //       })
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       data: courseDetails,
// //     })
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     })
// //   }
// // }


// exports.getCourseDetails = async (req, res) => {
//     try {
//       const { courseId } = req.body
//       const courseDetails = await Course.findOne({
//         _id: courseId,
//       })
//         .populate({
//           path: "instructor",
//           populate: {
//             path: "additionalDetails",
//           },
//         })
//         .populate("category")
//         .populate("ratingAndReviews")
//         .populate({
//           path: "courseContent",
//           populate: {
//             path: "subSection",
//             select: "-videoUrl",
//           },
//         })
//         .exec()
  
//       if (!courseDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find course with id: ${courseId}`,
//         })
//       }
  
//       // if (courseDetails.status === "Draft") {
//       //   return res.status(403).json({
//       //     success: false,
//       //     message: `Accessing a draft course is forbidden`,
//       //   });
//       // }
  
//       let totalDurationInSeconds = 0
//       courseDetails.courseContent.forEach((content) => {
//         content.subSection.forEach((subSection) => {
//           const timeDurationInSeconds = parseInt(subSection.timeDuration)
//           totalDurationInSeconds += timeDurationInSeconds
//         })
//       })
  
//       const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
//       return res.status(200).json({
//         success: true,
//         data: {
//           courseDetails,
//           totalDuration,
//         },
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
//   }


//ADDED IN LATER STAGE SO REQUIRE A REVIEW AND REVISION AS THERE MIGHT BE SOME MISTAKE

  exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  


  // Get a list of Course for a given Instructor
  exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }


  // Delete the Course
  exports.deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.body
  
      // Find the course
      const course = await Course.findById(courseId)
      if (!course) {
        return res.status(404).json({ message: "Course not found" })
      }
  
      // Unenroll students from the course
      const studentsEnrolled = course.studentsEnrolled
      for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
  
      // Delete sections and sub-sections
      const courseSections = course.courseContent
      for (const sectionId of courseSections) {
        // Delete sub-sections of the section
        const section = await Section.findById(sectionId)
        if (section) {
          const subSections = section.subSection
          for (const subSectionId of subSections) {
            await SubSection.findByIdAndDelete(subSectionId)
          }
        }
  
        // Delete the section
        await Section.findByIdAndDelete(sectionId)
      }
  
      // Delete the course
      await Course.findByIdAndDelete(courseId)
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
    }
  }