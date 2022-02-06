const myCache = require('../services/cacheServise')

const dependencies = {
    order: ["order", "stats"],
    product: ["product", "cart"],
    user: ["user", "order/"]
}

module.exports = function (req, res, next) {
    const keys = myCache.keys()
    let regex = req.originalUrl.split('/')[2]
    regex = new RegExp((dependencies[regex])?.join('|') ?? regex)

    if (keys[0]) {
        for (const key of keys) {

            let tmp = key.match(regex)
            if (tmp) {
                myCache.del(tmp['input'])
            }
        }
    }
    next()
}