const mongoose = require('mongoose');

const readyOrderSchema = new mongoose.Schema({
    dateCancel: {
        type: Date
    }
})

module.exports = mongoose.model('ReadyOrder', readyOrderSchema);