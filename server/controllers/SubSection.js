//importing required model
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {deleteFileFromCloudinary} = require('../utils/cloudinaryFileUpload');
require('dotenv').config();
const {uploadFileToCloudinary} = require('../utils/cloudinaryFileUpload');
const Course = require('../models/Course');

//controlelr for creating a new section
exports. createSubSection = async (req, resp) => {
    try{
        //fetch data related to the subsection
        const {courseId, sectionId,title, description } = req.body;
        //fetch file or video
        const videoFile = req.files.videoFile;
        //validate all data and file
        if(!videoFile || !sectionId || !title || !description || !courseId){
            return resp.status(403).json({
                success: false,
                message: 'all fields are required'
            })
        }        
        //upload the file to cloudinary first as we will get the url of the video from there after which we will put that url in the subsection data
        const uploadResponse = await uploadFileToCloudinary(videoFile, process.env.CLOUDINARY_FOLDER);//me yaha pe await bhul gaya tha .... ye bohot important hai

        //make a entry in db about new subsection from where we will get the id of the subsection
        const newSubsection = await SubSection.create({title, description, videoUrl: uploadResponse.secure_url});
        //the insert that id into its parent section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { $push: { subSection: newSubsection._id } }, {new:true}).populate('subSection').exec();
        console.log('updated section looks like :- ',updatedSection);

        //getting updated course after this operation
        const updatedCourse = await Course.findById(courseId).populate({path:'courseContent', populate : {path:'subSection'}}).exec();

        //after that return the success response
        return resp.status(201).json({
            success: true,
            message: 'new subsection created successfully',
            data: newSubsection,
            section: updatedSection,
            course: updatedCourse,
        })


    }catch(err){
        console.log('error ocuured while creating a subsection:-', err.message);
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}

//controller for updating a section
// exports. updateSubSection = async (req,resp) => {
//     try{
//         //fetch data related to the subsection
//         const { subsectionId, title, timeDuration, description } = req.body;
//         //validate all data
//         if(!title ||!timeDuration ||!description || !subsectionId){
//             return resp.status(403).json({
//                 success: false,
//                 message: 'all fields are required'
//             })
//         }        
//         //update the subsection in db
//         const updatedSubsection = await SubSection.findByIdAndUpdate(subsectionId, { title, description, timeDuration }, {new:true});
//         console.log('updated subsection looks like :- ',updatedSubsection);

//         //after that return the success response
//         return resp.status(200).json({
//             success: true,
//             message: 'subsection updated successfully',
//             data: updatedSubsection,
//         })
//     }catch(err){
//         return resp.status(500).json({
//             success: false,
//             message: 'internal server error',
//             error: err.message
//         })
//     }
// }

// //controller for deleting a subsection
// exports. deleteSubSection = async (req, resp) => {
//     try{
//         //fetch data (assuming data is passed as parameters in the path url) // NOTICE THAT IN DELETING CONTROLLERS WE ARE TRYING TO TAKE INPUT IN PARAMETERS
//         const {subSectionId} = req.params;
//         //validate
//         if(!subSectionId){
//             return resp.status(403).json({
//                 success: false,
//                 message: 'all fields are required'
//             })
//         }
//         //delete the video from cloudinary
//         const subSection = await SubSection.findById(subSectionId);
//         //extracting public id from the file which is passed as 1st parameter to delete a file
//         const publicId = subSection.videoUrl.split('/').pop().split('.')[0]; // assuming public Id dont have any slash
//         console.log('public id of the file is :- ', publicId);
        
//         const deletedData = await deleteFileFromCloudinary(publicId, 'video');
//         console.log('deleted data is :- ', deletedData);
//         //delete the subsection from db
//         const deletedSubsection = await SubSection.findByIdAndDelete(subSectionId);
//         //return response
//         return resp.status(200).json({
//             success: true,
//             message:'subsection deleted successfully',
//             data: deletedSubsection,
//         })

//     }catch(err){
//         console.log('error occurred while deleting a subsection', err.message);
//         console.error(err.message);
//         resp.status(500).json({
//             success: false,
//             message: 'internal server error',
//             error: err.message
//         })
//     }
// }

exports.updateSubSection = async (req, res) => {
    try {
      const {courseId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      //important to check if there is req.files before checking req.files.video
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadFileToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`//this is important to know
      }
  
      await subSection.save()
  

      const updatedCourse = await Course.findById(courseId).populate({path:'courseContent', populate : {path:'subSection'}}).exec();
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        course: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  

  //THIS IS NOT DELETEING FILES FROM CLOUDINARY CHECK IT ONCE :- CHECK THE SYNTAX OF THE DELETING FUNCTION DEFINES IN UTILS
  exports.deleteSubSection = async (req, res) => {
    try {
      const {courseId, subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )

      //fetching the subsection data for getting secure url
      const subSection = await SubSection.findById(subSectionId);

      if (!subSection) {
        return res
         .status(404)
         .json({ success: false, message: "Subsection not found" })
      }

      //delete the video from cloudinary

        //extracting public id from the file which is passed as 1st parameter to delete a file
        const publicId = subSection.videoUrl.split('/').pop().split('.')[0]; // assuming public Id dont have any slash
        console.log('public id of the file is :- ', publicId);
        
        const deletedData = await deleteFileFromCloudinary(publicId, 'video');
        console.log('deleted data is :- ', deletedData);

      const deletedsubSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!deletedsubSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )

        //getting updated course after this operation
        const updatedCourse = await Course.findById(courseId).populate({path:'courseContent', populate : {path:'subSection'}}).exec();      
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
        course: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }