//importing required model
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const uploadFileToCloudinary = require('../utils/cloudinaryFileUpload');
const deleteFileFromCloudinary = require('../utils/cloudinaryFileUpload');
require('dotenv').config();

//controlelr for creating a new section
exports. createSection = async (req, resp) => {
    try{
        //fetch data related to the subsection
        const {sectionId,title, timeDuration, description } = req.body;
        //fetch file or video
        const videoFile = req.files.videoFile;
        //validate all data and file
        if(!videoFile || !sectionId || !title || !timeDuration || !description){
            return resp.status(403).json({
                success: false,
                message: 'all fields are required'
            })
        }        
        //upload the file to cloudinary first as we will get the url of the video from there after which we will put that url in the subsection data
        const uploadResponse = await uploadFileToCloudinary(videoFile, process.env.CLOUDINARY_FOLDER);//me yaha pe await bhul gaya tha .... ye bohot important hai

        //make a entry in db about new subsection from where we will get the id of the subsection
        const newSubsection = await SubSection.create({title, description, timeDuration, videoUrl: uploadResponse.secure_url});
        //the insert that id into its parent section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { $push: { subsections: newSubsection._id } }, {new:true}).populate('subSection').exec();
        console.log('updated section looks like :- ',updatedSection);

        //after that return the success response
        return resp.status(201).json({
            success: true,
            message: 'new subsection created successfully',
            data: newSubsection,
            section: updatedSection,
        })


    }catch(err){
        console.log('error ocuured while creating a subsection', err.message);
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}

//controller for updating a section
exports. updateSection = async (req,resp) => {
    try{
        //fetch data related to the subsection
        const { subsectionId, title, timeDuration, description } = req.body;
        //validate all data
        if(!title ||!timeDuration ||!description || !subsectionId){
            return resp.status(403).json({
                success: false,
                message: 'all fields are required'
            })
        }        
        //update the subsection in db
        const updatedSubsection = await SubSection.findByIdAndUpdate(subsectionId, { title, description, timeDuration }, {new:true});
        console.log('updated subsection looks like :- ',updatedSubsection);

        //after that return the success response
        return resp.status(200).json({
            success: true,
            message: 'subsection updated successfully',
            data: updatedSubsection,
        })
    }catch(err){
        return resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}

//controller for deleting a subsection
exports. deleteSubsection = async (req, resp) => {
    try{
        //fetch data (assuming data is passed as parameters in the path url) // NOTICE THAT IN DELETING CONTROLLERS WE ARE TRYING TO TAKE INPUT IN PARAMETERS
        const {subSectionId} = req.params;
        //validate
        if(!subSectionId){
            return resp.status(403).json({
                success: false,
                message: 'all fields are required'
            })
        }
        //delete the video from cloudinary
        const subSection = await SubSection.findById(subSectionId);
        //extracting public id from the file which is passed as 1st parameter to delete a file
        const publicId = subSection.videoUrl.split('/').pop().split('.')[0]; // assuming public Id dont have any slash
        console.log('public id of the file is :- ', publicId);
        
        const deletedData = await deleteFileFromCloudinary(publicId, 'video');
        console.log('deleted data is :- ', deletedData);
        //delete the subsection from db
        const deletedSubsection = await Subsection.findByIdAndDelete(subSectionId);
        //return response
        return resp.status(200).json({
            success: true,
            message:'subsection deleted successfully',
            data: deletedSubsection,
        })

    }catch(err){
        console.log('error occurred while deleting a subsection', err.message);
        console.error(err.message);
        resp.status(500).json({
            success: false,
            message: 'internal server error',
            error: err.message
        })
    }
}