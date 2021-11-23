const ApiError = require("../error/ApiError");
const cartService = require("../services/cartService");


class CartController {
    async addProduct(req, res, next){
        try {
            const {id} = req.user
            let {product_id, quantity, dispenser_id} = req.body
            quantity = quantity || 1
            if (+quantity < 1) {
                return next(ApiError.badRequest('Quantity must be greater than 0'))
            }
            const cart = await cartService.addProduct(product_id, dispenser_id, id, +quantity)
            return res.json(cart)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getCart(req, res, next){
        try {
            const {id} = req.user
            const cart = await cartService.getCart(id)
            return res.json(cart)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async deleteProduct(req, res, next){
        try {
            const {id} = req.user
            let {product_id} = req.params
            const cart = await cartService.deleteProduct(product_id, id)
            return res.json(cart)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new CartController()
