module.exports = class UserProfileDto{
    id;
    email;
    firstname;
    lastname;
    phone;
    imageUrl;
    birth_date;
    gender;
    isActivated;
    role;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.firstname = model.firstname || "";
        this.lastname = model.lastname || "";
        this.phone = model.phone || "";
        this.imageUrl =
            model.imageUrl !== undefined
                ? `${process.env.API_URL}/${model.imageUrl}`
                : "";
        this.birth_date = model.birth_date || "";
        this.gender = model.gender || "";
        this.isActivated = model.isActivated;
        this.role = model.role || "USER";
    }
}