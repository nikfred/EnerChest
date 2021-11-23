const orderService = require('../services/orderService')
const ApiError = require('../error/ApiError')

class OrderController {
    async create(req, res, next){
        try {
            const {id} = req.user
            const order = await orderService.create(id)
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
}

module.exports = new OrderController()