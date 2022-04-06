const mongoose = require('mongoose');

const dispenserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    latitude: {
        type: String,
        trim: true
    },
    longitude: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Dispenser', dispenserSchema);

