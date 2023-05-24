const ApiError = require('../error/ApiError')
const User = require('../models/user.model')

module.exports = async function (req, res, next) {
    try {
        if (!await User.findOne({_id: req.user.id, role: 'ADMIN'}, "_id")) {
            next(ApiError.forbidden('Отказано в доступе'))
        }
        next()
    } catch (e) {
        console.log(e)
        next(ApiError.forbidden('Отказано в доступе'))
    }
}
