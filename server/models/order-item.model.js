const {Schema, Types, model} = require('mongoose');

const orderItemSchema = new Schema({
    order_id: {
        type: Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product_id: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false
})

orderItemSchema.index({order_id: 1})

module.exports = model('OrderItem', orderItemSchema);
