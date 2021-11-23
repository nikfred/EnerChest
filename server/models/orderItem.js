const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('OrderItem', orderItemSchema);
