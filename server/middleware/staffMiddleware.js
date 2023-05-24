const ApiError = require('../error/ApiError')
const User = require('../models/user.model')

module.exports = async function (req, res, next) {
    try {
        const role = (await User.findById(req.user.id)).role
        if (role !== 'ADMIN' && role !== 'STAFF') {
            next(ApiError.forbidden('Отказано в доступе'))
        }
        next()
    } catch (e) {
        console.log(e)
        next(ApiError.forbidden('Отказано в доступе'))
    }
}
