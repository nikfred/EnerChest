const mongoose = require('mongoose');

const readyOrderSchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true
    },
    dateCancel: {
        type: Date
    }
})

module.exports = mongoose.model('ReadyOrder', readyOrderSchema);