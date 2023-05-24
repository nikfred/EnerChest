const {Schema, Types, model} = require('mongoose');

const cartItemSchema = new Schema({
    cart_id: {
        type: Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    product_id: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
    },
    dispenser_id: {
        type: Types.ObjectId,
        ref: 'Dispenser',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    versionKey: false
})

module.exports = model('CartItem', cartItemSchema);
