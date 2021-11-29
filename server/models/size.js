const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Size', sizeSchema);
