const {Schema, Types, model} = require('mongoose');

const productSchema = new Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String,
        //unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: String,
    size: {
        type: String,
        trim: true,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

productSchema.index({brand: 1, name: 1})

module.exports = model('Product', productSchema);
