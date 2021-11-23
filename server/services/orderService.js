const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const Cart = require('../models/cart')
const CartItem = require('../models/cartItem')
const DispenserItem = require('../models/dispenserItem')
const Product = require('../models/product')
const dispenserService = require('../services/dispenserService')
const cartService = require('../services/cartService')
const ApiError = require('../error/ApiError')

class OrderService {
    async create(uid) {
        let cart = await Cart.findOne({uid})
        const cartItems = await CartItem.find({cart_id: cart._id})
        if (cartItems.length === 0) {
            throw ApiError.notFound("Cart is empty")
        }

        const order = new Order({uid, dispenser_id: cartItems[0].dispenser_id})
        const dispenserItems = await DispenserItem.find({dispenser_id: order.dispenser_id})
        let blockedItems = []
        let product, dispenserItem
        for (const cartItem of cartItems) {
            // checking the same dispenser
            if (order.dispenser_id === cartItem.dispenser_id) {
                dispenserItem = dispenserItems.filter(i => i.product_id.toString() === cartItem.product_id.toString())[0]

                // checking the quantity of free products inside the dispenser
                if (+dispenserItem.quantityFree >= +cartItem.quantity) {
                    product = await Product.findById(cartItem.product_id)
                    order.total += +product.price * +cartItem.quantity
                    order.quantity += +cartItem.quantity

                    await OrderItem.create({
                        order_id: order._id,
                        product_id: cartItem.product_id,
                        quantity: cartItem.quantity
                    })

                    // product booking
                    await dispenserService.reservation(order.dispenser_id, cartItem.product_id, -cartItem.quantity)

                    // delete product from cart
                    await cartService.deleteProduct(product._id, uid)
                } else {
                    blockedItems.push(cartItem._doc)
                }
            } else {
                blockedItems.push(cartItem._doc)
            }
        }
        return {order: order.total > 0 ? await Order.create(order) : {}, blockedItems}
    }

    async getUnreadyOrder(order_id, uid) {
        const order = await Order.findById(order_id)
        if (!order || order.uid.toString().indexOf(uid) === -1 || order.status !== "Ready") {
            throw ApiError.notFound("Order not found")
        }
        return order
    }

    async completion(order_id, uid) {
        const order = await this.getUnreadyOrder(order_id, uid)
        const orderItems = await OrderItem.find({order_id})
        for (const orderItem of orderItems) {
            await dispenserService.delivery(order.dispenser_id, orderItem.product_id, orderItem.quantity)
        }

        return Order.findOneAndUpdate(
            {_id: order_id},
            {status: "Complete"},
            {new: true}
        )
    }

    async canceled(order_id, uid) {
        const order = await this.getUnreadyOrder(order_id, uid)
        const orderItems = await OrderItem.find({order_id})
        for (const orderItem of orderItems) {
            await dispenserService.returned(order.dispenser_id, orderItem.product_id, orderItem.quantity)
        }

        return Order.findOneAndUpdate(
            {_id: order_id},
            {status: "Cancel"},
            {new: true}
        )
    }
}

module.exports = new OrderService()
