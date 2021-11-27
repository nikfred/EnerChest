const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const Product = require('../models/product')
const Brand = require('../models/brand')
const ProductDto = require('../dtos/productDto')
const ApiError = require('../error/ApiError')

class ProductService {
    async create(productData, img, newBrandFlag = false) {
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

        if (await Product.findOne(productData)) {
            throw ApiError.badRequest("Product is exist")
        }

        productData.imageUrl = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '../static', productData.imageUrl))
        const product = await Product.create(productData)
        console.log("New Product:")
        console.log(product)
        return new ProductDto(product)
    }

    async update(product_id, productData) {
        let product = await Product.findById(product_id)
        console.log('Update product')
        console.log(product)
        if (!product) {
            throw ApiError.notFound('Product not found')
        } else {
            productData = {
                name: productData.name || product.name,
                price: productData.price || product.price,
                size: productData.size || product.size,
                imageUrl: productData.imageUrl || product.imageUrl,
                description: productData.description || product.description,
                discount: productData.discount || product.discount
            }
        }
        product = await Product.findOneAndUpdate(
            {_id: product_id},
            productData,
            {new: true, upsert: true})
        return new ProductDto(product)

    }

    async search(brand = undefined, size = undefined) {
        let rawProducts
        if (!brand && !size) {
            rawProducts = await this.getAll()
        } else {
            // const brand = brand_id ? (await Brand.findById(brand_id)).brand : undefined
            const filter = brand ? size ? {brand, size} : {brand} : {size}
            console.log(filter)
            rawProducts = await Product.find(filter)
        }
        const products = []
        for (const rawProduct of rawProducts) {
            products.push(new ProductDto(rawProduct))
        }
        return products
    }

    async activate(product_id, active = true) {
        return Product.findOneAndUpdate({_id: product_id}, {active}, {new: true, upsert: true})
    }

    async getAll() {
        return Product.find()
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

    async delete(product_id) {
        const product = await Product.findById(product_id)
        fs.unlinkSync(path.resolve(__dirname, "../static", product.imageUrl))
        return Product.deleteOne({_id: product_id})
    }
}

module.exports = new ProductService()