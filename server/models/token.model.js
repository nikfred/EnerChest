const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Token', tokenSchema);

