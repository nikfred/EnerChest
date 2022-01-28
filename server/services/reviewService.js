const Review = require('../models/review')
const userService = require('./userService')
const productService = require('./productService')
const ReviewDto = require('../dtos/reviewDto')
const ApiError = require('../error/ApiError')

class ReviewService {
    async create(uid, product_id, data) {
        const user = await userService.getUser(uid)
        await productService.getOne(product_id)
        let review
        if (await Review.find({uid, product_id})[0]) {
            throw ApiError.forbidden("Запрещено делать более 1 отзыва")
        } else {
            review = await Review.create({uid, product_id, ...data})
            return new ReviewDto({...review._doc, ...user})
        }
    }

    async getByProductId(product_id) {
        const reviews = []
        let user, review
        const rawReviews = await Review.find({product_id})
        for (const rawReview of rawReviews) {
            user = await userService.getUser(rawReview.uid)
            review = new ReviewDto({...rawReview._doc, ...user})
            reviews.push(review)
        }
        return reviews
    }

    async getRating(product_id) {
        const ratings = (await Review.find({product_id}, "rating"))
            .map(i => i.rating)
        const sum = ratings.reduce((sum, i) => sum + i, 0)
        return (+sum / ratings.length).toFixed(2)
    }

    async delete(uid, review_id) {
        const review = await Review.findById(review_id)
        if (!review) {
            throw ApiError.notFound("Review not found")
        } else if (review.uid.toString().indexOf(uid) === -1) {
            throw ApiError.forbidden("Not your review")
        }
        return Review.findByIdAndDelete(review_id)
    }
}

module.exports = new ReviewService()