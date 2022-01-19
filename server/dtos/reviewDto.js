module.exports = class ReviewDto{
    id;
    uid;
    firstname;
    lastname;
    imageUrl;
    product_id;
    rating;
    text;
    date;

    constructor(model) {
        this.id = model._id;
        this.uid = model.uid;
        this.firstname = model.firstname || "";
        this.lastname = model.lastname || "";
        this.imageUrl = model.imageUrl || "";
        this.product_id = model.product_id;
        this.rating = +model.rating || 0;
        this.text = model.text || "";
        this.date = model.date//.toString().split('.')[0];
    }
}