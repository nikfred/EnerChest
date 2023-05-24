const ApiError = require("../error/ApiError");
const cartService = require("../services/cart.service");

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
            next(e)
        }
    }

    async getCart(req, res, next){
        try {
            const {id} = req.user
            const cart = await cartService.getCart(id)
            return res.json(cart)
        } catch (e) {
            next(e)
        }
    }

    async deleteItem(req, res, next){
        try {
            const {id} = req.user
            let {item_id} = req.params
            const cart = await cartService.deleteItem(item_id, id)
            return res.json(cart)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CartController()
