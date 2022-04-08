const dispenserService = require('../services/dispenserService')
const ApiError = require("../error/ApiError");

class DispenserController {
    async create(req, res, next) {
        try {
            const {address, latitude, longitude} = req.body
            if (!address || address.toString().trim() === "") {
                return next(ApiError.badRequest('Address not specified'))
            }
            const dispenser = await dispenserService.create({address, latitude, longitude})
            return res.json(dispenser)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async updateDispenser(req, res, next) {
        try {
            const {dispenser_id} = req.params
            const {address, latitude, longitude} = req.body
            const dispenser = await dispenserService.updateDispenser(dispenser_id, {address, latitude, longitude})
            return res.json(dispenser)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async updateStatus(req, res, next) {
        try {
            const {dispenser_id} = req.params
            const dispenser = await dispenserService.updateStatus(dispenser_id)
            return res.json(dispenser)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async addProduct(req, res, next) {
        try {
            let {dispenser_id, product_id, quantityAdd, quantityRemove} = req.body
            if (quantityAdd < quantityRemove) {
                return next(ApiError.badRequest('quantityAdd cannot be less than quantityRemove'))
            }
            const dispenserItem = await dispenserService.addProduct(dispenser_id, product_id, quantityAdd, quantityRemove)
            return res.json(dispenserItem)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllDispenser(req, res, next) {
        try {
            res.body = await dispenserService.getAllDispenser()
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getProducts(req, res, next) {
        try {
            const {dispenser_id} = req.params
            res.body = await dispenserService.getProducts(dispenser_id)
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getDispensersWithProduct(req, res, next) {
        try {
            const {product_id} = req.params
            res.body = await dispenserService.getDispensersWithProduct(product_id)
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new DispenserController()