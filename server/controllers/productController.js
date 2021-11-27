const productService = require('../services/productService')
const ApiError = require("../error/ApiError");


class ProductController {
    async createProduct(req, res, next) {
        try {
            const {brand, name, price, description, size, newBrandFlag} = req.body
            const {img} = req.files
            const productData = {brand, name, price, description, size}
            let product = ""
            if (brand === "" || size === "") {
                return next(ApiError.badRequest('Incorrectly entered data'))
            } else {
                product = await productService.create(productData, img, newBrandFlag)
            }
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
            console.log(e)
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
            console.log(e)
            next(e)
        }
    }

    async getAllBrands(req, res, next){
        try {
            const products = await productService.getAllBrands()
            return res.json(products)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async search(req, res, next){
        try {
            const {brand, size} = req.query
            const products = await productService.search(brand, size)
            return res.json(products)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async update(req, res, next){
        try {
            const {product_id} = req.params
            const {name, price, size, imageUrl, description, discount} = req.body
            const productData = {name, price, size, imageUrl, description, discount}
            const product = await productService.update(product_id, productData)
            return res.json(product)
        } catch (e) {
            console.log(e)
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
            console.log(e)
            next(e)
        }
    }

    async delete(req, res, next){
        try {
            const {product_id} = req.params
            const product = await productService.delete(product_id)
            return res.json(product)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new ProductController()