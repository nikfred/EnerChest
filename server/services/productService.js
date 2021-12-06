const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const Product = require('../models/product')
const Brand = require('../models/brand')
const Size = require('../models/size')
const ProductDto = require('../dtos/productDto')
const ApiError = require('../error/ApiError')

class ProductService {
    async create(productData, img, newBrandFlag = false, newSizeFlag = false) {
        // Check exist or Create new brand
        // true - create
        // false - check exist
        if (!newBrandFlag) {
            if (!await Brand.findOne({brand: productData.brand})) {
                throw ApiError.notFound("Brand is not exist")
            }
        } else {
            if (!await Brand.findOne({brand: productData.brand})) {
                const brand = await Brand.create({brand: productData.brand})
                console.log("New Brand:")
                console.log(brand)
            }
        }
        if (!newSizeFlag) {
            if (!await Size.findOne({value: productData.size})) {
                throw ApiError.notFound("Size is not exist")
            }
        } else {
            if (!await Size.findOne({value: productData.size})) {
                const size = await Size.create({value: productData.size})
                console.log("New Size:")
                console.log(size)
            }
        }

        if (await Product.findOne(productData)) {
            throw ApiError.badRequest("Product is exist")
        }

        productData.imageUrl = uuid.v4() + ".png"
        await img.mv(path.resolve(__dirname, '../static', productData.imageUrl))
        const product = await Product.create(productData)
        console.log("New Product:")
        console.log(product)
        return new ProductDto(product)
    }

    async update(product_id, productData, img = null) {
        let product = await Product.findById(product_id)
        console.log('Update product')
        console.log(product)
        console.log('Image')
        console.log(img)
        if (!product) {
            throw ApiError.notFound('Product not found')
        } else {
            productData = {
                name: productData.name || product.name,
                price: productData.price || product.price,
                size: productData.size || product.size,
                description: productData.description || product.description,
                discount: productData.discount || product.discount
            }

            let imageUrl = null
            if (img) {
                imageUrl = uuid.v4() + ".png"
                console.log(imageUrl)
                console.log(path.resolve(__dirname, '../static', imageUrl))
                await img.mv(path.resolve(__dirname, '../static', imageUrl))
                if (product.imageUrl) {
                    console.log('Delete old image')
                    console.log(path.resolve(__dirname, "../static", product.imageUrl))
                    fs.unlinkSync(path.resolve(__dirname, "../static", product.imageUrl))
                }
                productData.imageUrl = imageUrl
            }
        }
        product = await Product.findOneAndUpdate(
            {_id: product_id},
            productData,
            {new: true, upsert: true})
        return new ProductDto(product)

    }

    async search(brand = undefined, size = undefined, limit = 16, page = 1) {
        limit = +limit
        const skip = +limit * +page - +limit
        const filter =
            brand
                ? size
                    ? {brand, size}
                    : {brand}
                : size
                    ? {size}
                    : {}
        // console.log(filter)
        // console.log('Skip = ' + skip)
        // console.log('Limit = ' + limit)
        const count = (await Product.find(filter)).length
        const rawProducts = await Product.find(
            filter,
            {},
            { sort: {brand: 'asc', name: 'asc', price: 'asc'}, skip, limit})
        const products = []
        for (const rawProduct of rawProducts) {
            products.push(new ProductDto(rawProduct))
        }
        return {count, products}
    }

    async activate(product_id, active = true) {
        return Product.findOneAndUpdate({_id: product_id}, {active}, {new: true, upsert: true})
    }

    async getAll() {
        const rawProducts = await Product.find(
            {},
            {},
            { sort: {brand: 'asc', name: 'asc', price: 'asc'}})
        const products = []
        for (const rawProduct of rawProducts) {
            products.push(new ProductDto(rawProduct))
        }
        return products
    }

    async getOne(product_id) {
        const product = await Product.findOne({_id: product_id})
        if (!product) {
            throw ApiError.notFound("Product not found")
        }
        return new ProductDto(product)
    }

    async getAllBrands() {
        return Brand.find()
    }

    async getAllSizes() {
        return Size.find()
    }

    async delete(product_id) {
        const product = await Product.findById(product_id)
        fs.unlinkSync(path.resolve(__dirname, "../static", product.imageUrl))
        return Product.deleteOne({_id: product_id})
    }
}

module.exports = new ProductService()