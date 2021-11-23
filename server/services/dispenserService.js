const Dispenser = require('../models/dispenser')
const Product = require('../models/product')
const DispenserItem = require('../models/dispenserItem')
const ApiError = require('../error/ApiError')

const findDispenserById = async (dispenser_id) => {
    const dispenser = await Dispenser.findById(dispenser_id)
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
    async create(address) {
        let dispenser = await Dispenser.findOne({address})
        if (dispenser) {
            throw ApiError.badRequest("Dispenser exist")
        }
        dispenser = await Dispenser.create({address})
        console.log("New Dispenser: " + dispenser)
        return dispenser
    }

    async getAllDispenser(){
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
}

module.exports = new DispenserService()