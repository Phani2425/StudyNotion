const mongoose = require('mongoose');

const RatingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true,
        trim: true,
    }

});

module.exports = mongoose.model('RatingAndReview', RatingAndReviewSchema);