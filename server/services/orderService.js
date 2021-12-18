const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const ReadyOrder = require('../models/readyOrder')
const Cart = require('../models/cart')
const CartItem = require('../models/cartItem')
const Dispenser = require('../models/dispenser')
const DispenserItem = require('../models/dispenserItem')
const Product = require('../models/product')
const dispenserService = require('../services/dispenserService')
const cartService = require('../services/cartService')
const ApiError = require('../error/ApiError')
const ProductDto = require("../dtos/productDto");
const OrderDto = require("../dtos/orderDto")

const minTime = 6
const maxTime = 12

const transformationOrder = async (order) => {
    order.address = (await Dispenser.findById(order.dispenser_id)).address
    order = new OrderDto(order)
    const orderItems = await OrderItem.find({order_id: order.id})
    let products = []
    let product
    for (const orderItem of orderItems) {
        product = await Product.findById(orderItem.product_id)
        if (!product) {
            throw ApiError.notFound("Product not found")
        }
        product = new ProductDto(product)
        product.quantity = orderItem.quantity
        products.push(product)
    }
    return {order, products}
}

class OrderService {
    async create(uid, time = minTime) {
        time =
            time <= minTime
                ? minTime
                : time >= maxTime
                    ? maxTime
                    : time

        let cart = await Cart.findOne({uid})
        const cartItems = await CartItem.find({cart_id: cart._id})
        if (cartItems.length === 0) {
            throw ApiError.notFound("Cart is empty")
        }

        let order = new Order({
            uid,
            dispenser_id: cartItems[0].dispenser_id,
            dateCancel: new Date(+new Date() + time*60*60*1000)
        })
        const dispenserItems = await DispenserItem.find({dispenser_id: order.dispenser_id})
        let blockedItems = []
        let product, dispenserItem
        for (const cartItem of cartItems) {
            if (order.dispenser_id.toString() === cartItem.dispenser_id.toString()) {
                dispenserItem = dispenserItems
                    .filter(i => i.product_id.toString() === cartItem.product_id.toString())[0]
                if (+dispenserItem.quantityFree >= +cartItem.quantity) {
                    product = await Product.findById(cartItem.product_id)
                    order.total = +order.total +product.price * +cartItem.quantity
                    order.quantity += +cartItem.quantity

                    await OrderItem.create({
                        order_id: order._id,
                        product_id: cartItem.product_id,
                        quantity: cartItem.quantity
                    })

                    // product booking
                    await dispenserService.reservation(order.dispenser_id, cartItem.product_id, cartItem.quantity)

                    // delete product from cart
                    await cartService.deleteProduct(product._id, uid)
                } else {
                    blockedItems.push(cartItem._doc)
                }
            } else {
                blockedItems.push(cartItem._doc)
            }
        }
        if (order.total > 0) {
            await order.save()
            await ReadyOrder.create({_id: order._id, dateCancel: order.dateCancel})
        }
        return {order, blockedItems}
    }

    async getReadyOrder(order_id, uid) {
        const order = await Order.findById(order_id)
        if (!order || order.uid.toString().indexOf(uid) === -1 || order.status !== "Ready") {
            throw ApiError.notFound("Order not found")
        }
        return order
    }

    async completion(order_id, uid) {
        console.log('Complete order: ' + order_id)
        const order = await this.getReadyOrder(order_id, uid)
        const orderItems = await OrderItem.find({order_id})
        for (const orderItem of orderItems) {
            await dispenserService.delivery(order.dispenser_id, orderItem.product_id, orderItem.quantity)
        }
        return this.deleteReadyOrder(order_id, 'Complete')
    }

    async canceled(order_id, uid = null) {
        console.log('Cancel order: ' + order_id)
        let order
        if (uid) {
            order = await this.getReadyOrder(order_id, uid)
        } else {
            order = await Order.findById(order_id)
        }
        const orderItems = await OrderItem.find({order_id})
        for (const orderItem of orderItems) {
            await dispenserService.returned(order.dispenser_id, orderItem.product_id, orderItem.quantity)
        }
        return this.deleteReadyOrder(order_id, 'Cancel')
    }

    async deleteReadyOrder(order_id, status = 'Cancel') {
        await ReadyOrder.findOneAndDelete({_id: order_id})
        return Order.findOneAndUpdate(
            {_id: order_id},
            {status: status},
            {new: true}
        )
    }

    async checkReadyOrder() {
        //console.log('Check Ready Order')
        const orders = await ReadyOrder.find().sort({dateCancel: 'asc'})
        const dateNow = +Date.now()
        for (const order of orders) {
            if (+order.dateCancel < dateNow) {
                await this.canceled(order._id)
                await ReadyOrder.findOneAndDelete({_id: order._id})
            } else {
                break
            }
        }
    }

    async getUserOrders(uid) {
        const rawOrders = await Order.find(
            {uid},
            {},
            {sort: {date: 'desc'}}
        )
        let orders = []
        for (const rawOrder of rawOrders) {
            orders.push(await transformationOrder(rawOrder))
        }
        return orders
    }
}

module.exports = new OrderService()
