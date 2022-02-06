const reviewService = require('../services/reviewService')
const ApiError = require('../error/ApiError')

const minRating = 0, maxRating = 5

class ReviewController {
    async create(req, res, next) {
        try {
            const {id} = req.user
            let {product_id, rating, text} = req.body
            if (!product_id) {
                return next(ApiError.badRequest("Product is not specified"))
            } else if (!rating && rating !== 0) {
                return next(ApiError.badRequest("Rating is not specified"))
            }
            rating =
                +rating > maxRating
                    ? maxRating
                    : +rating < minRating
                        ? minRating
                        : +rating
            const review = await reviewService.create(id, product_id, {rating, text})
            return res.json(review)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getByProductId(req, res, next) {
        try {
            const {product_id} = req.params
            if (!product_id) {
                return next(ApiError.badRequest("Product is not specified"))
            }
            res.body = await reviewService.getByProductId(product_id)
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getRating(req, res, next) {
        try {
            const {product_id} = req.params
            if (!product_id) {
                return next(ApiError.badRequest("Product is not specified"))
            }
            res.body = await reviewService.getRating(product_id)
            next()
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.user
            const {review_id} = req.params
            if (!review_id) {
                return next(ApiError.badRequest("Product is not specified"))
            }
            const review = await reviewService.delete(id, review_id)
            return res.json(review)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new ReviewController()