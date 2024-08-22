const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
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

    // Define the password field with type String and required
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ['Admin', "Student", "Instructor"],
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
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
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },


		// Add timestamps for when the document is created and last modified

},
{ timestamps: true }//passed as 2nd parameter in this function
);

module.exports = mongoose.model('User', UserSchema);