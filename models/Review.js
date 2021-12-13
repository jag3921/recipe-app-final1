const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    recipeName:{
        type: String,
        required: true
    },
    recipeId: {
        type: Number,
        required: true
    },
    userReview: {
        type: String,
        required: true
    },
    likes: {
        type: Number, 
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

const ReviewModel = mongoose.model("reviews", ReviewSchema);

module.exports = ReviewModel;