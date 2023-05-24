const productService = require('../services/product.service')
const dispenserService = require('../services/dispenser.service')
const ApiError = require("../error/ApiError");


class ProductController {
    async createProduct(req, res, next) {
        try {
            let {brand, name, price, description, size} = req.body
            let {img} = req.files
            const productData = {brand, name, price, description, size}
            const product = await productService.create(productData, img)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next){
        try {
            const products = await productService.getAll()
            return res.json(products)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next){
        try {
            const {product_id} = req.params
            const product = await productService.getOne(product_id)
            if (!product) {
                return next(ApiError.notFound('Product not found'))
            }
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async getAllBrands(req, res, next){
        try {
            const brands = await productService.getAllBrands()
            return res.json(brands)
        } catch (e) {
            next(e)
        }
    }

    async getAllSizes(req, res, next){
        try {
            const sizes = await productService.getAllSizes()
            return res.json(sizes)
        } catch (e) {
            next(e)
        }
    }

    async search(req, res, next){
        try {
            let {brand, size, dispenser: dispenser_id, limit, page} = req.query
            brand = brand?.split(',')
            size = size?.split(',')
            const {count, products} = dispenser_id
                // ? await productService.searchInDispenser(brand, size, dispenser, limit, page)
                ? await dispenserService.searchProducts({brand, size, dispenser_id, limit, page})
                : await productService.search(brand, size, limit, page)
            return res.json({count, products})
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next){
        try {
            const {product_id} = req.params
            const {name, price, size, description, discount} = req.body
            const img = req?.files?.img
            const productData = {name, price, size, description, discount}
            const product = await productService.update(product_id, productData, img)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next){
        try {
            const {product_id} = req.params
            const {state} = req.query
            if (state !== "true" && state !== "false" && state !== undefined) {
                return next(ApiError.badRequest('State must be Boolean type'))
            }
            const product = await productService.activate(product_id, state)
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next){
        try {
            const {product_id} = req.params
            const product = await productService.delete(product_id)
            return res.json(product ? 'Successful deletion' : 'Failed deletion')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ProductController()
