const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const CartItem = require('../models/cart-item.model')
const Dispenser = require('../models/dispenser.model')
const dispenserService = require('./dispenser.service')
const ApiError = require('../error/ApiError')
const ProductDto = require('../dtos/product.dto')

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

        const quantityFree = await dispenserService.getProductQuantityFree(product_id, dispenser_id)
        console.log('quantityFree = ' + quantityFree)

        const cartItem = await CartItem.findOne({cart_id: cart._id, product_id, dispenser_id})
        if (cartItem) {
            console.log("Old CartItem")
            console.log('quantity in cart = ' + quantityFree)
            if (+cartItem.quantity + +quantity > quantityFree) {
                quantity = quantityFree - +cartItem.quantity
            }
            await CartItem.findOneAndUpdate({_id: cartItem._id}, {quantity: +(+cartItem.quantity + quantity)})
        } else {
            quantity = quantity > quantityFree ? quantityFree : quantity
            console.log("New CartItem")
            await CartItem.create({cart_id: cart._id, product_id, dispenser_id, quantity})
        }
        console.log('quantity = ' + quantity)

        cart = await Cart.findOneAndUpdate(
            {_id: cart._id},
            {
                total: +(+cart.total + +product.price * quantity),
                quantity: +(cart.quantity + quantity)
            },
            {new: true, upsert: true}
        )
        return cart
    }

    async getCart(uid) {
        let cart = await Cart.findOne({uid}, "-__v")
        if (!cart) {
            cart = await Cart.create({uid})
        }

        const cartItems = await CartItem.find({cart_id: cart._id})
        let products = []
        let product
        for (const cartItem of cartItems) {
            product = await Product.findById(cartItem.product_id)
            if (!product) {
                throw ApiError.notFound("Product not found")
            }
            product = new ProductDto(product)
            product.item_id = cartItem._id
            product.quantity = cartItem.quantity
            product.dispenser_id = cartItem.dispenser_id
            products.push(product)
        }
        return {cart, products}
    }

    async deleteItem(id, uid) {
        let cart = await Cart.findOne({uid})
        if (!cart) {
            throw ApiError.notFound("Cart not found")
        }

        const cartItem = await CartItem.findById(id)
        if (!cartItem) {
            throw ApiError.notFound("Cart Item not found")
        }

        const product = await Product.findById(cartItem.product_id)

        await Cart.updateOne(
            {_id: cart._id},
            {
                total: +(cart.total - product.price * cartItem.quantity),
                quantity: +(cart.quantity - cartItem.quantity)
            },
            {upsert: true}
        )
        return CartItem.deleteOne({_id: id})
    }
}

module.exports = new CartService()
