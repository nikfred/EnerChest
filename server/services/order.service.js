const Order = require('../models/order.model')
const OrderItem = require('../models/order-item.model')
const ReadyOrder = require('../models/ready-order.model')
const Cart = require('../models/cart.model')
const CartItem = require('../models/cart-item.model')
const Dispenser = require('../models/dispenser.model')
const DispenserItem = require('../models/dispenser-item.model')
const Product = require('../models/product.model')
const User = require('../models/user.model')

const dispenserService = require('./dispenser.service')
const cartService = require('./cart.service')
const numberGenerator = require('../utils/number-generator')
const ApiError = require('../error/ApiError')

const ProductDto = require("../dtos/product.dto");
const OrderDto = require("../dtos/order.dto")
const OrderUserDto = require("../dtos/order-user.dto")
const {Types} = require("mongoose");

const minTime = 6
const maxTime = 12

const transformationOrder = async (order, addProduct = false, addUser = false) => {
    order._doc.address = (await Dispenser.findById(order.dispenser_id)).address
    if (addUser) {
        const user = await User.findById(order.uid)
        order = new OrderUserDto({...order._doc, ...user._doc, _id: order.id})
    } else {
        order = new OrderDto(order._doc)
    }
    if (addProduct) {
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
    return {order}
}

class OrderService {
    async create(uid, dispenser_id, time = minTime) {
        time =
            time <= minTime
                ? minTime
                : time >= maxTime
                    ? maxTime
                    : time

        let cart = await Cart.findOne({uid})
        const cartItems = await CartItem.find({cart_id: cart._id, dispenser_id})
        if (cartItems.length === 0) {
            throw ApiError.notFound("Cart is empty")
        }

        let number
        do {
            number = numberGenerator(6)
        } while (await Order.findOne({number}))

        let order = new Order({
            uid,
            number,
            dispenser_id,
            dateCancel: new Date(+new Date() + time * 60 * 60 * 1000)
        })
        const dispenserItems = await DispenserItem.find({dispenser_id})
        let blockedItems = []
        let product, dispenserItem
        for (const cartItem of cartItems) {
            if (dispenser_id.toString() === cartItem.dispenser_id.toString()) {
                dispenserItem = dispenserItems
                    .filter(i => i.product_id.toString() === cartItem.product_id.toString())[0]

                if (+dispenserItem.quantityFree >= +cartItem.quantity) {
                    product = await Product.findById(cartItem.product_id)
                    order.total = +order.total + product.price * +cartItem.quantity
                    order.quantity += +cartItem.quantity

                    await OrderItem.create({
                        order_id: order._id,
                        product_id: cartItem.product_id,
                        quantity: cartItem.quantity
                    })

                    // product booking
                    await dispenserService.reservation(dispenser_id, cartItem.product_id, cartItem.quantity)

                    // delete product from cart
                    await cartService.deleteItem(cartItem._id, uid)
                } else {
                    blockedItems.push(cartItem._doc)
                }
            } else {
                blockedItems.push(cartItem._doc)
            }
        }
        if (order.total > 0) {
            await order.save()
            await ReadyOrder.create({_id: order._id, dateCancel: order.dateCancel, number})
        }
        return order
    }

    async getReadyOrder(order_id, uid) {
        let order
        if (order_id.length === 6) {
            order = await Order.findOne({number: +order_id})
        } else {
            order = await Order.findById(order_id)
        }

        console.log(order)

        if (!order || order.status !== "Ready" || uid && order.uid.toString().indexOf(uid) === -1) {
            throw ApiError.notFound("Order not found")
        }
        return order
    }

    async completion(order_id, uid) {
        console.log('Complete order: ' + order_id)
        const order = await this.getReadyOrder(order_id, uid)
        const orderItems = await OrderItem.find({order_id: order._id})
        for (const orderItem of orderItems) {
            await dispenserService.delivery(order.dispenser_id, orderItem.product_id, orderItem.quantity)
        }
        return this.deleteReadyOrder(order._id, 'Complete')
    }

    async canceled(order_id, uid = null) {
        console.log('Cancel order: ' + order_id)
        let order = await this.getReadyOrder(order_id, uid)
        const orderItems = await OrderItem.find({order_id: order._id})
        for (const orderItem of orderItems) {
            await dispenserService.returned(order.dispenser_id, orderItem.product_id, orderItem.quantity)
        }
        return this.deleteReadyOrder(order._id, 'Cancel')
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
        // const rawOrders = await Order.find(
        //     {uid},
        //     {},
        //     {sort: {date: 'desc'}}
        // )
        // let orders = []
        // for (const rawOrder of rawOrders) {
        //     orders.push(await transformationOrder(rawOrder, true))
        // }
        return Order.aggregate([
            {
                $match: {
                    uid: new Types.ObjectId(uid),
                }

            }, {
                $sort: {date: -1}
            },
            // {
            //     $skip: skip,
            // }, {
            //     $limit: limit
            // },
            {
                $lookup: {
                    from: "orderitems",
                    let: {order_id: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$order_id", "$$order_id"],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "products",
                                let: {product_id: "$product_id"},
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$product_id"],
                                            },
                                        },
                                    },
                                    {
                                        $project: {
                                            id: {$toString: "$_id"},
                                            _id: 0,
                                            brand: 1,
                                            name: 1,
                                            size: 1,
                                            price: {$toString: "$price"},
                                        },
                                    },
                                ],
                                as: "products",
                            },
                        },
                        {
                            $replaceRoot: {
                                newRoot: {
                                    $mergeObjects: [
                                        {$first: "$products"},
                                        {quantity: "$quantity"},
                                    ],
                                },
                            },
                        },
                    ],
                    as: "products",
                }
            }, {
                $lookup: {
                    from: "dispensers",
                    localField: "$dispenser_id",
                    foreignField: "$_id",
                    as: "dispenser",
                }
            }, {
                $projects: {}
            }
        ])
    }

    async getAllOrders(status = null, limit = 10, page = 1) {
        limit = +limit
        const skip = +limit * +page - +limit
        const filter = status ? {status} : {}
        // const rawOrders = await Order.find(
        //     filter,
        //     {},
        //     {sort: {date: 'desc'}, skip, limit}
        // )
        return Order.aggregate([
            {
                $match: filter
            }, {
                $skip: skip,
            }, {
                $limit: limit
            }, {
                $lookup: {
                    from: "orderitems",
                    let: {order_id: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$order_id", "$$order_id"],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "products",
                                let: {product_id: "$product_id"},
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id", "$$product_id"],
                                            },
                                        },
                                    },
                                    {
                                        $project: {
                                            id: {$toString: "$_id"},
                                            _id: 0,
                                            brand: 1,
                                            name: 1,
                                            size: 1,
                                            image: 1,
                                            price: {$toString: "$price"},
                                        },
                                    },
                                ],
                                as: "products",
                            },
                        },
                        {
                            $replaceRoot: {
                                newRoot: {
                                    $mergeObjects: [
                                        {$first: "$products"},
                                        {quantity: "$quantity"},
                                    ],
                                },
                            },
                        },
                    ],
                    as: "products",
                }
            }, //{},
        ])
        // let orders = []
        // const orders = await Promise.all.yml(rawOrders.map(i => transformationOrder(i, false, true)))
        // // for (const rawOrder of rawOrders) {
        // //     orders.push(await transformationOrder(rawOrder, false, true))
        // // }
        // return orders
    }

    async getAllOrderStats() {
        const stats = {
            completeTotal: 0,
            completeCount: 0,
            cancelTotal: 0,
            cancelCount: 0
        }
        const [completeOrders, cancelOrders] = await Promise.all([
            Order.find({status: "Complete"}, "total quantity").lean(),
            Order.find({status: "Cancel"}, "total quantity").lean()
        ])
        for (const completeOrder of completeOrders) {
            stats.completeTotal += +completeOrder.total
            stats.completeCount += +completeOrder.quantity
        }
        for (const cancelOrder of cancelOrders) {
            stats.cancelTotal += +cancelOrder.total
            stats.cancelCount += +cancelOrder.quantity
        }
        return stats
    }

    async getAllProductStats() {
        return await Order.aggregate([
            {
                $match: {
                    status: "Complete"
                }
            }, {
                $project: {
                    _id: 1
                }
            }, {
                $lookup: {
                    from: "orderitems",
                    localField: "_id",
                    foreignField: "order_id",
                    as: "items"
                }
            }, {
                $unwind: "$items"
            }, {
                $group: {
                    _id: "$items.product_id",
                    quantity: {
                        $sum: "$items.quantity"
                    }
                }
            }, {
                $lookup: {
                    from: "products",
                    let: {product_id: "$_id"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$product_id"]
                                }
                            },
                        }, {
                            $project: {
                                id: {$toString: "$_id"},
                                _id: 0,
                                brand: 1,
                                name: 1,
                                size: 1,
                                imageUrl: 1,
                                price: {$toString: "$price"},
                                // price: "$price",
                            },
                        },
                    ],
                    as: "product"
                }
            }, {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {$first: "$product"},
                            {quantity: "$quantity"}
                        ],
                    }
                }
            }
        ])
    }

    async getAllDispenserStats() {
        return await Order.aggregate([
            {
                $match: {
                    status: "Complete"
                }
            }, {
                $group: {
                    _id: "$dispenser_id",
                    quantity: {
                        $sum: "$quantity"
                    }
                }
            }, {
                $sort: {
                    quantity: -1
                }
            }, {
                $lookup: {
                    from: "dispensers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "dispenser"
                }
            }, {
                $project: {
                    _id: 0,
                    id: {$toString: "$_id"},
                    address: {$first: "$dispenser.address"},
                    latitude: {$first: "$dispenser.latitude"},
                    longitude: {$first: "$dispenser.longitude"},
                    status: {$first: "$dispenser.status"},
                    quantity: 1
                }
            }
        ])
    }
}

module.exports = new OrderService()
