const orderDto = require('./order.dto')

module.exports = class orderUserDto extends orderDto{
    uid;
    email;
    firstname;
    lastname;
    phone;

    constructor(model) {
        super(model)
        this.uid = model.uid;
        this.email = model.email;
        this.firstname = model.firstname || "";
        this.lastname = model.lastname || "";
        this.phone = model.phone || "";
    }
}
