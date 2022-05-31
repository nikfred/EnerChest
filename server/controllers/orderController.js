const orderService = require('../services/orderService')
const ApiError = require('../error/ApiError')

class OrderController {
    async create(req, res, next){
        try {
            const {id} = req.user
            const {time, dispenser_id} = req.body
            if (!dispenser_id) {
                return next(ApiError.badRequest('dispenser_id is missing'))
            }
            const order = await orderService.create(id, dispenser_id, time)
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
            res.body = await orderService.getAllOrders(status, limit, page)
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllOrderStats(req, res, next) {
        try {
            res.body = await orderService.getAllOrderStats()
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllProductStats(req, res, next) {
        try {
            res.body = await orderService.getAllProductStats()
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllDispenserStats(req, res, next) {
        try {
            res.body = await orderService.getAllDispenserStats()
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new OrderController()