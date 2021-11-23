const Cart = require('../models/cart')
const Product = require('../models/product')
const CartItem = require('../models/cartItem')
const Dispenser = require('../models/dispenser')
const ApiError = require('../error/ApiError')

class CartService {
    async addProduct(product_id, dispenser_id, uid, quantity = 1) {
        const product = await Product.findById(product_id)
        if (!product) {
            throw ApiError.notFound("Product not found")
        }
        const dispenser = await Dispenser.findById(dispenser_id)
        if (!dispenser) {
            throw ApiError.notFound("Dispenser not found")
        }
        let cart = await Cart.findOne({uid})
        if (!cart) {
            throw ApiError.notFound("Cart not found")
        }

        cart = await Cart.findOneAndUpdate(
            {_id: cart._id},
            {
                total: +(+cart.total + +product.price * quantity),
                quantity: +(cart.quantity + quantity)
            },
            {new: true, upsert: true}
        )

        const cartItem = await CartItem.findOne({cart_id: cart._id, product_id, dispenser_id})
        if (cartItem) {
            console.log("Old CartItem")
            await CartItem.findOneAndUpdate({_id: cartItem._id}, {quantity: +(+cartItem.quantity + quantity)})
        } else {
            console.log("New CartItem")
            await CartItem.create({cart_id: cart._id, product_id, dispenser_id, quantity})
        }
        return cart
    }

    async getCart (uid) {
        const cart = await Cart.findOne({uid})
        if (!cart) {
            throw ApiError.notFound("Cart not found")
        }

        const cartItems = await CartItem.find({cart_id: cart._id})
        let products = []
        let product
        for (const cartItem of cartItems) {
            product = await Product.findById(cartItem.product_id)
            if (!product) {
                throw ApiError.notFound("Product not found")
            }
            product._doc.quantity = cartItem.quantity
            products.push(product)
        }
        return {cart, products}
    }

    async deleteProduct(product_id, uid) {
        const product = await Product.findById(product_id)
        let cart = await Cart.findOne({uid})
        if (!cart) {
            throw ApiError.notFound("Cart not found")
        }

        const cartItem = await CartItem.findOne({cart_id: cart._id, product_id})
        if (!cartItem) {
            throw ApiError.notFound("Cart Item not found")
        }

        cart = await Cart.findOneAndUpdate(
            {_id: cart._id},
            {
                total: +(cart.total - product.price * cartItem.quantity),
                quantity: +(cart.quantity - cartItem.quantity)
            },
            {new: true, upsert: true}
        )
        return CartItem.findOneAndDelete({cart_id: cart._id, product_id})
    }
}

module.exports = new CartService()