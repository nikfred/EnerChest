const Express = require('express')
const router = Express.Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const checkCacheMiddleware = require('../middleware/checkCacheMiddleware')
const saveCacheMiddleware = require('../middleware/saveCacheMiddleware')
const deleteCacheMiddleware = require('../middleware/deleteCacheMiddleware')

router.post('/create', authMiddleware, deleteCacheMiddleware, orderController.create)
router.get('/completion/:order_id', authMiddleware, deleteCacheMiddleware, orderController.completion)
router.get('/canceled/:order_id', authMiddleware, deleteCacheMiddleware, orderController.canceled)
router.get('/', authMiddleware, orderController.getUserOrders)

router.get('/all', authMiddleware, adminMiddleware, checkCacheMiddleware, orderController.getAllOrders, saveCacheMiddleware)

module.exports = router