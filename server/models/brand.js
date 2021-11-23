const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        //unique: true
    }
})

module.exports = mongoose.model('Brand', brandSchema);
