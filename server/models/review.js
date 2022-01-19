const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: { //name by @lizik_story
        type: Number,
        default: 0,
        required: true
    },
    text: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Review', reviewSchema);
