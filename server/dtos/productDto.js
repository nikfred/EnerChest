module.exports = class productDto{
    id;
    name;
    size;
    price;
    discount;
    description;
    imageUrl;
    active;

    constructor(model) {
        this.id = model._id;
        this.name = `${model.brand} ${model.name || ""}`.trim();
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