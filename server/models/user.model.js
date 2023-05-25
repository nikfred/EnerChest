const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        default: "",
        trim: true
    },
    lastname: {
        type: String,
        default: "",
        trim: true
    },
    imageUrl: {
        type: String,
    },
    balance: {
        type: Number,
        default: 1000
    },
    birth_date: Date,
    role: {
        type: String,
        enum: {
            values: ['USER', 'ADMIN', 'STAFF'],
            message: '{VALUE} is not supported'
        },
        default: 'USER'
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: String,
    tempPassword: String,
    updateLink: String,
    updateCancel: Date
})

module.exports = model('User', userSchema);
