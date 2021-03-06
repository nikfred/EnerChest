const productService = require('../services/productService')
const fileService = require('../services/fileService')
const ApiError = require("../error/ApiError");


class ProductController {
    async createProduct(req, res, next) {
        try {
            let {brand, name, price, description, size, newBrandFlag, newSizeFlag} = req.body
            let {img} = req.files
            newBrandFlag = newBrandFlag === 'true'
            newSizeFlag = newSizeFlag === 'true'
            console.log('newBrandFlag = ' + newBrandFlag)
            console.log('newSizeFlag = ' + newSizeFlag)
            const productData = {brand, name, price, description, size}
            let product = ""
            if (brand === "" || size === "") {
                return next(ApiError.badRequest('Incorrectly entered data'))
            } else {
                product = await productService.create(productData, img, newBrandFlag, newSizeFlag)
            }
            return res.json(product)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next){
        try {
            res.body = await productService.getAll()
            next()
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
            const brands = await productService.getAllBrands()
            return res.json(brands)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllSizes(req, res, next){
        try {
            const sizes = await productService.getAllSizes()
            return res.json(sizes)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async search(req, res, next){
        try {
            let {brand, size, dispenser, limit, page} = req.query
            brand = brand?.split(',')
            size = size?.split(',')
            res.body = dispenser
                ? await productService.searchInDispenser(brand, size, dispenser, limit, page)
                : await productService.search(brand, size, limit, page)
            next()
        } catch (e) {
            console.log(e)
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
            return res.json(product ? 'Successful deletion' : 'Failed deletion')
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async discipline(req, res, next) {
        try {
            const result = await fileService.disciplineImage('product')
            return res.json(result ? 'Discipline complete' : 'Discipline not complete')
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new ProductController()