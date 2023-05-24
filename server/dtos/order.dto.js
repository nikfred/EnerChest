module.exports = class orderDto{
    id;
    number;
    address;
    total;
    quantity;
    date;
    status;

    constructor(model) {
        this.id = model._id;
        this.number = model.number;
        this.address = model.address || "";
        this.total = +model.total || 0;
        this.quantity = +model.quantity || 0;
        this.date = model.date//.toString().split('.')[0];
        this.status = model.status;
    }
}