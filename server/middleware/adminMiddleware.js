const ApiError = require('../error/ApiError')
const User = require('../models/user')

module.exports = async function (req, res, next) {
    try {
        if ((await User.findById(req.user.id)).role !== 'ADMIN') {
            next(ApiError.forbidden('Отказано в доступе'))
        }
        next()
    } catch (e) {
        console.log(e)
        next(ApiError.forbidden('Отказано в доступе'))
    }
}