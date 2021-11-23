const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        //unique: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    description: String,
    size: {
        type: String,
        trim: true,
        required: true
    },
    discount: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Product', productSchema);
