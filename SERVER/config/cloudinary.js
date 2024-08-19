const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports. connectToCloudinary = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
        console.log('connection to cloudinary established');

    }catch(err){
        console.log('error occured during estabilishing connection to cloudinary');
        console.error(err.message);
        process.exit(1);
    }
}