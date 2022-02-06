const Express = require('express')
const router = Express.Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const checkCacheMiddleware = require('../middleware/checkCacheMiddleware')
const saveCacheMiddleware = require('../middleware/saveCacheMiddleware')

const admin = [authMiddleware, adminMiddleware, checkCacheMiddleware]

router.get('/orders', ...admin, orderController.getAllOrderStats, saveCacheMiddleware)
router.get('/products', ...admin, orderController.getAllProductStats, saveCacheMiddleware)
router.get('/dispensers', ...admin, orderController.getAllDispenserStats, saveCacheMiddleware)

module.exports = router