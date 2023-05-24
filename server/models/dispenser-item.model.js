const mongoose = require('mongoose');

const dispenserItemSchema = new mongoose.Schema({
    dispenser_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Dispenser',
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantityAll: {
        type: Number,
        default: 1
    },
    quantityFree: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('DispenserItem', dispenserItemSchema);