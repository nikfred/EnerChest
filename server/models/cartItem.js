const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    dispenser_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Dispenser',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('CartItem', cartItemSchema);
