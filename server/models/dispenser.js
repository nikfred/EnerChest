const mongoose = require('mongoose');

const dispenserSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Dispenser', dispenserSchema);

