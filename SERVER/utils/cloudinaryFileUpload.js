const cloudinary = require('cloudinary').v2;

exports. uploadFileToCloudinary = async (file,folder, height, quality) => {
    try{
        //upload the file to cloudinary
        const options = {folder};
        options.resoure_type = auto;
        //agar function ke parameter me koi quality pass hua hai??? then:- option ka quakity property set kardo
        if(quality){
            options.quality = quality;
        }
        //agar function ke parameter me koi height pass hua hai?? then:- option ka height property set kardo
        if(height){
            options.height = height;
        }

        //call the uploader function
        const response = await cloudinary.uploader.upload(file, options);
        return response;
        
    }catch(err){
        console.log("error occured during uploading file to cloudinary",err.message);
        console.error(err.message);
    }
}

//function for deleting files from cloudinary
exports.deleteFileFromCloudinary = async (publicId, resourceType) => {
    try{
        //delete the file from cloudinary
        const deletedData = await cloudinary.uploader.destroy(publicId, {resource_type: resourceType});
        return deletedData;
    }catch(err){
        console.log("error occured during deleting file from cloudinary",err.message);
        console.error(err.message);
    }
}