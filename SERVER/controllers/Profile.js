const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');

//controlelr for creating profile or in other terms adding additional details to the user data
//but here wew ill be just updating the profile as we have already created a profile while creating a user and thhat  profile had null data

exports. updateProfile = async (req,resp) => {
    try{
        //fetch data
        const {dateOfBirth="", about="", contactNo, gender} = req.body;
        //fetch userid
        const userId = req.user.id;
        //validate
        if(!contactNo || !userId || gender){
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
        //after that return the success response
        return resp.status(200).json({
            success: true,
            message: 'profile updated successfully',
            data: updatedProfile,
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


exports. deleteAccout = async(req, resp) => {
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

exports.getAllUserData = async(req, resp) => {
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