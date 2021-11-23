const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        //required: true,
        default: "",
        trim: true
    },
    lastname: {
        type: String,
        default: "",
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        validate: (value) => {
            return validator.isMobilePhone(value)
        }
    },
    imageUrl: {
        type: String,
        //unique: true
    },
    birth_date: Date,
    gender: {
        type: String,
        enum: ['Мужской', 'Женский', 'Другой'],
        default: 'Другой'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'STAFF'],
        default: 'USER'
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: String
})

module.exports = mongoose.model('User', userSchema);