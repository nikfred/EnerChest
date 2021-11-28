module.exports = class productDto{
    id;
    brand;
    name;
    size;
    price;
    discount;
    description;
    imageUrl;
    active;

    constructor(model) {
        this.id = model._id;
        this.brand = model.brand;
        this.name = model.name || "";
        this.size = model.size || "";
        this.price = +model.price || 0;
        this.discount = +model.discount || 0;
        this.description = model.description || "";
        this.imageUrl =
            model.imageUrl !== undefined
                ? `${process.env.API_URL}/${model.imageUrl}`
                : "";
        this.active = model.active || "";
    }
}