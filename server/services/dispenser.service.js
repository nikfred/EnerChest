const Dispenser = require('../models/dispenser.model')
const Product = require('../models/product.model')
const DispenserItem = require('../models/dispenser-item.model')
const ApiError = require('../error/ApiError')
const {Types} = require("mongoose");
const calculateSkip = require('../utils/calculateSkip')

const findDispenserById = async (dispenser_id) => {
    const dispenser = await Dispenser.findById(dispenser_id).lean()
    if (!dispenser) {
        throw ApiError.notFound("Dispenser not found")
    }
    return dispenser
}

const findProductById = async (product_id) => {
    const product = await Product.findById(product_id)
    if (!product) {
        throw ApiError.notFound("Product not found")
    }
    return product
}

class DispenserService {
    async create(dispenserData) {
        let dispenser = await Dispenser.findOne({address: dispenserData.address})
        if (dispenser) {
            throw ApiError.badRequest("Dispenser exist")
        }
        dispenser = await Dispenser.create(dispenserData)
        console.log("New Dispenser: " + dispenser)
        return dispenser
    }

    async updateDispenser(id, dispenserData) {
        let dispenser = await findDispenserById(id)
        dispenserData = {
            address: dispenserData.address || dispenser.address,
            latitude: dispenserData.latitude || dispenser.latitude,
            longitude: dispenserData.longitude || dispenser.longitude,
        }
        return Dispenser.findOneAndUpdate({_id: id}, dispenserData, {new: true, upsert: true})
    }

    async updateStatus(id) {
        const dispenser = await findDispenserById(id)
        return Dispenser.findOneAndUpdate({_id: id}, {status: !dispenser.status}, {new: true})
    }

    async getOne(id) {
        const dispenser = await Dispenser.findById(id)
        if (!dispenser) {
            throw ApiError.notFound("Dispenser not found")
        }
        return dispenser
    }

    async getAll() {
        return Dispenser.find()
    }

    async addProduct(dispenser_id, product_id, quantityAdd = 6, quantityRemove = 0) {
        await findDispenserById(dispenser_id)
        await findProductById(product_id)

        let dispenserItem = await DispenserItem.findOne({dispenser_id, product_id})
        if (dispenserItem) {
            dispenserItem = await DispenserItem.findOneAndUpdate(
                {dispenser_id, product_id},
                {
                    quantityAll: +dispenserItem.quantityAll + +quantityAdd - +quantityRemove,
                    quantityFree: +dispenserItem.quantityFree + +quantityAdd - +quantityRemove
                },
                {new: true, upsert: true}
            )
        } else {
            dispenserItem = await DispenserItem.create({
                dispenser_id,
                product_id,
                quantityAll: +quantityAdd,
                quantityFree: +quantityAdd
            })
        }

        return dispenserItem
    }

    async updateQuantityFree(dispenser_id, product_id, quantity) {
        await findDispenserById(dispenser_id)
        await findProductById(product_id)
        let dispenserItem = await DispenserItem.findOne({dispenser_id, product_id})
        if (!dispenserItem) {
            throw ApiError.notFound("DispenserItem not found")
        }
        const newQuantityFree = +dispenserItem.quantityFree - +quantity

        return DispenserItem.findOneAndUpdate(
            {_id: dispenserItem._id},
            {quantityFree: newQuantityFree},
            {new: true})
    }

    async reservation(dispenser_id, product_id, quantity) {
        return this.updateQuantityFree(dispenser_id, product_id, quantity)
    }

    async returned(dispenser_id, product_id, quantity) {
        console.log('returned ' + product_id)
        return this.updateQuantityFree(dispenser_id, product_id, -quantity)
    }

    async delivery(dispenser_id, product_id, quantity) {
        await findDispenserById(dispenser_id)
        await findProductById(product_id)
        let dispenserItem = await DispenserItem.findOne({dispenser_id, product_id})
        if (!dispenserItem) {
            throw ApiError.notFound("DispenserItem not found")
        }
        const newQuantityAll = +dispenserItem.quantityAll - +quantity
        return DispenserItem.findOneAndUpdate(
            {_id: dispenserItem._id},
            {quantityAll: newQuantityAll},
            {new: true})
    }

    async searchProducts({brands = [], sizes = [], dispenser_id, limit = 16, page = 1}) {
        const productMatch = {
            $expr: {
                $eq: ["$_id", "$$id"]
            },
        }
        brands.length && (productMatch.brand = {$in: brands})
        sizes.length && (productMatch.size = {$in: sizes})
        const [{products, count}] = await Dispenser.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(dispenser_id)
                }
            }, {
                $lookup: {
                    from: "dispenseritems",
                    localField: "_id",
                    foreignField: "dispenser_id",
                    as: "items"
                }
            }, {
                $unwind: "$items"
            }, {
                $lookup: {
                    from: "products",
                    // localField: "items.product_id",
                    // foreignField: "_id",
                    let: {id: "$items.product_id"},
                    pipeline: [{$match: productMatch}],
                    as: "product"
                }
            }, {
                $match: {
                    $expr: {
                        $gt: [{$size: "$product"}, 0]
                    }
                }
            }, {
                $facet: {
                    count: [
                        {$count: "count"}
                    ],
                    products: [
                        {
                            $skip: calculateSkip(limit, page)
                        }, {
                            $limit: +limit
                        }, {
                            $replaceRoot: {
                                newRoot: {
                                    $mergeObjects: [
                                        "$$ROOT",
                                        "$items",
                                        {$first: "$product"},
                                    ],
                                },
                            }
                        }, {
                            $project: {
                                _id: 0,
                                id: {$toString: "$_id"},
                                brand: 1,
                                name: 1,
                                imageUrl: 1,
                                price: 1,
                                size: 1,
                                quantityAll: 1,
                                quantityFree: 1,
                                dispenser_id: {$toString: "$dispenser_id"},
                                address: 1,
                            }
                        }
                    ]
                }
            },
        ])
        return {products, count: count[0].count}
    }

    async getDispensersWithProduct(product_id) {
        let dispensers = await DispenserItem.find({product_id})
        let dispenser
        for (let i = 0; i < dispensers.length; i++) {
            dispenser = await Dispenser.findById(dispensers[i].dispenser_id)
            dispensers[i] = {
                dispenser_id: dispenser._id,
                address: dispenser.address,
                latitude: dispenser.latitude,
                longitude: dispenser.longitude,
                status: dispenser.status,
                product_id,
                quantityAll: dispensers[i].quantityAll,
                quantityFree: dispensers[i].quantityFree
            }
            console.log(dispensers[i])
        }
        return dispensers
    }

    async getProductQuantityFree(product_id, dispenser_id) {
        return (await DispenserItem.findOne({product_id, dispenser_id})).quantityFree
    }

    async clear() {
        return DispenserItem.deleteMany({quantityAll: 0})
    }
}

module.exports = new DispenserService()
