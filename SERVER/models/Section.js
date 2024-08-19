const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        trim: true,
    },
    subSection: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubSection',
            required: true
        }
    ],
});

module.exports = mongoose.model('Section', SectionSchema);