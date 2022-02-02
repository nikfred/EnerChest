const Express = require('express')
const router = Express.Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.get('/orders', authMiddleware, adminMiddleware, orderController.getAllOrderStats)
router.get('/products', authMiddleware, adminMiddleware, orderController.getAllProductStats)
router.get('/dispensers', authMiddleware, adminMiddleware, orderController.getAllDispenserStats)

module.exports = router