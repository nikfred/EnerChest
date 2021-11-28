const productDto = require('./productDto')

module.exports = class dispenserItemDto extends productDto{
    address;
    quantityAll;
    quantityFree;

    constructor(model) {
        super(model)
        this.address = model.address;
        this.quantityAll = model.quantityAll;
        this.quantityFree = model.quantityFree;
    }
}