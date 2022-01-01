const orderService = require('../services/orderService')
const ApiError = require('../error/ApiError')

class OrderController {
    async create(req, res, next){
        try {
            const {id} = req.user
            const {time} = req.body
            const order = await orderService.create(id, time)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async completion(req, res, next){
        try {
            const {id} = req.user
            const {order_id} = req.params
            const order = await orderService.completion(order_id, id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async canceled(req, res, next){
        try {
            const {id} = req.user
            const {order_id} = req.params
            const order = await orderService.canceled(order_id, id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getUserOrders(req, res, next){
        try {
            const {id} = req.user
            const order = await orderService.getUserOrders(id)
            return res.json(order)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const {status, limit, page} = req.query
            const orders = await orderService.getAllOrders(status, limit, page)
            return res.json(orders)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllOrderStats(req, res, next) {
        try {
            const stats = await orderService.getAllOrderStats()
            return res.json(stats)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new OrderController()