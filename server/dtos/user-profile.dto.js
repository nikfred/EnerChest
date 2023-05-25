module.exports = class UserProfileDto{
    id;
    email;
    firstname;
    lastname;
    imageUrl;
    balance;
    birth_date;
    isActivated;
    role;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.firstname = model.firstname || "";
        this.lastname = model.lastname || "";
        this.imageUrl = model.imageUrl ?? null;
        this.balance = model.balance ?? 0;
        this.birth_date = model.birth_date || "";
        this.isActivated = model.isActivated;
        this.role = model.role || "USER";
    }
}
