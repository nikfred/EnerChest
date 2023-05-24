const Product = require('../models/product.model')
const ProductDto = require('../dtos/product.dto')
const ApiError = require('../error/ApiError')
const redis = require("../tools/redis");
const {uploadFile, removeFile} = require("../tools/aws");

class ProductService {
    async create(productData, img) {

        img && (productData.imageUrl = await uploadFile(img, 'product'))
        const product = new ProductDto(await Product.create(productData))
        console.log("New Product:")
        console.log(product)
        // await redis.set(`product:${product.id}`, JSON.stringify(product))
        return product
    }

    async update(product_id, productData, img = null) {
        let product = await Product.findById(product_id).lean()
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

            if (img) {
                productData.imageUrl = await uploadFile(img, 'product')
                product.imageUrl && await removeFile(product.imageUrl)
            }
        }
        product = await Product.findOneAndUpdate(
            {_id: product_id},
            productData,
            {new: true})
        return new ProductDto(product)

    }

    async search(brands = [], sizes = [], limit = 16, page = 1) {
        limit = +limit
        const skip = +limit * +page - +limit
        //create filter
        const filter = {}
        brands.length && (filter.brand = {$in: brands})
        sizes.length && (filter.size = {$in: sizes})

        const [products, count] = await Promise.all([
            Product.find(
                filter,
                {},
                {sort: {brand: 1, name: 1, price: 1}, skip, limit}),
            Product.countDocuments(filter)
        ])
        return {count, products: products.map(i => new ProductDto(i))}
    }

    async activate(product_id, active = true) {
        return Product.findOneAndUpdate({_id: product_id}, {active}, {new: true})
    }

    async getAll() {
        const products = await Product.find(
            {},
            {},
            {sort: {brand: 'asc', name: 'asc', price: 'asc'}}).lean()
        return products.map(i => new ProductDto(i))
    }

    async getOne(product_id) {
        const product = await Product.findOne({_id: product_id}).lean()
        if (!product) {
            throw ApiError.notFound("Product not found")
        }
        return new ProductDto(product)
    }

    async getAllBrands2() {
        return (await Product.aggregate([
            {
                $group: {
                    _id: "$brand"
                }
            }, {
                $sort: {
                    _id: 1
                }
            }
        ])).map(i => i._id)
    }

    async getAllBrands() {
        return await Product.aggregate([
            {
                $group: {
                    _id: "$brand"
                }
            }, {
                $sort: {
                    _id: 1
                }
            }, {
                $project: {
                    brand: "$_id"
                }
            }
        ])
    }

    async getAllSizes() {
        return await Product.aggregate([
            {
                $group: {
                    _id: "$size"
                }
            }, {
                $sort: {
                    _id: 1
                }
            }, {
                $project: {
                    value: "$_id"
                }
            }
        ])
    }

    async getAllSizes2() {
        return (await Product.aggregate([
            {
                $group: {
                    _id: "$size"
                }
            }, {
                $sort: {
                    _id: 1
                }
            }
        ])).map(i => i._id)
    }

    async delete(product_id) {
        const product = await Product.findById(product_id)
        product.imageUrl && await removeFile(product.imageUrl)
        await Product.deleteOne({_id: product_id})
        return true
    }
}

module.exports = new ProductService()
