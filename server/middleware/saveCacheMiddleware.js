const myCache = require('../services/cacheServise')

module.exports = function (req, res, next) {
    const data = res.body
    const query = req.originalUrl
    console.log('Save in cache')
    myCache.set(query,data)
    return res.json(data)
}