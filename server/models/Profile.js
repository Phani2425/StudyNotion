const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String, //why not Date????
    },
    about: {
        type: String,
        trim: true,
    },
    contactNo: {
        type: Number,
        trim: true,
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);