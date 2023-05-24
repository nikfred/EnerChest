const ApiError = require('../error/ApiError')
const tokenService = require('../services/token.service')

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            next(ApiError.unauthorized('Пользователь не авторизован'))
        }

        const user = tokenService.validateAccessToken(token)
        if (!user) {
            next(ApiError.unauthorized('Пользователь не авторизован'))
        }

        req.user = user
        console.log(`${user.email} - ${user.role}`);
        next()
    } catch (e) {
        console.log(e)
        next(ApiError.unauthorized('Пользователь не авторизован'))
    }
}
