const myCache = require('../services/cacheServise')

module.exports = function (req, res, next) {
    const query = req.originalUrl
    const data = myCache.get(query)
    if (data) {
        return res.json(data)
    }
    next()
}