const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    total: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Cart', cartSchema);

