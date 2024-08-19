const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,

    },
    accountType: {
        type: String,
        enum: ['Admin', "Student", "Instructor"],
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    image: {
        type: String,
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course-Progress',
        }
    ],
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    }

});

module.exports = mongoose.model('User', UserSchema);