const {Schema, Types, model} = require('mongoose');

const cartSchema = new Schema({
    uid: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    total: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
})


module.exports = model('Cart', cartSchema);

