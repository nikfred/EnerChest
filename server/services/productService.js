const Product = require('../models/product')
const Brand = require('../models/brand')
const Size = require('../models/size')
const fileService = require('./fileService')
const dispenserService = require('./dispenserService')
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

        productData.imageUrl = await fileService.save(img, 'product')
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

            if (img) {
                productData.imageUrl = await fileService.save(img, 'product')
                product.imageUrl && await fileService.remove(product.imageUrl)
            }
        }
        product = await Product.findOneAndUpdate(
            {_id: product_id},
            productData,
            {new: true, upsert: true})
        return new ProductDto(product)

    }

    async search(brands = undefined, sizes = undefined, limit = 16, page = 1) {
        limit = +limit
        const skip = +limit * +page - +limit
        //create filter
        const filter =
            brands
                ? sizes
                    ? {brand: {$in: brands}, size: {$in: sizes}}
                    : {brand: {$in: brands}}
                : sizes
                    ? {size: {$in: sizes}}
                    : {}
        console.log(filter)
        const count = (await Product.find(filter)).length
        const rawProducts = await Product.find(
            filter,
            {},
            {sort: {brand: 'asc', name: 'asc', price: 'asc'}, skip, limit})
        const products = []
        for (const rawProduct of rawProducts) {
            products.push(new ProductDto(rawProduct))
        }
        return {count, products}
    }

    async searchInDispenser(brands = [], sizes = [], dispenser_id, limit = 16, page = 1) {
        limit = +limit
        const skip = +limit * +page - +limit
        let products = await dispenserService.getProducts(dispenser_id)
        if (brands[0]) {
            products = products.filter(i => brands.indexOf(i.brand) !== -1)
        }
        if (sizes[0]) {
            products = products.filter(i => sizes.indexOf(i.size) !== -1)
        }
        const count = products.length
        products = products
            .slice(skip, skip + limit)
            .sort((a, b) => a.brand > b.brand ? 1 : a.brand < b.brand ? -1 : 0)
        return {count, products}
    }

    async activate(product_id, active = true) {
        return Product.findOneAndUpdate({_id: product_id}, {active}, {new: true, upsert: true})
    }

    async getAll() {
        const rawProducts = await Product.find(
            {},
            {},
            {sort: {brand: 'asc', name: 'asc', price: 'asc'}})
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
        // fs.unlinkSync(path.resolve(__dirname, "../static", product.imageUrl))
        product.imageUrl && await fileService.remove(product.imageUrl)
        await Product.deleteOne({_id: product_id})

        //check last example of brand
        const lastBrand = (await Product.find({brand: product.brand}))[0]
        !lastBrand && await Brand.deleteOne({brand: product.brand})

        //check last example of size
        const lastSize = (await Product.find({size: product.size}))[0]
        !lastSize && await Size.deleteOne({value: product.size})

        return true
    }

    // async discipline() {
    //     let images = await Product.find({},'imageUrl')
    //     images = images
    //         .filter(i => i.imageUrl.indexOf('product'))
    //         .map(i => i.imageUrl)
    //     // await Product.updateMany({ imageUrl: { $in: images}}, {imageUrl: "product\\" + imageUrl})
    //     for (const image of images) {
    //         await Product.updateOne({imageUrl: image}, {imageUrl: })
    //     }
    //     await fileService.disciplineImage('product', images)
    //     return
    // }
}

module.exports = new ProductService()