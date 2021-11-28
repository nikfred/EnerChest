const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dispenser_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Dispenser',
        required: true
    },
    total: {
        type: mongoose.Types.Decimal128,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Ready",
        enum: ["Complete", "Ready", "Cancel"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    dateCancel: {
        type: Date
    }
})

module.exports = mongoose.model('Order', orderSchema);