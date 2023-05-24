const Express = require('express')
const router = Express.Router()
const orderController = require('../controllers/order.controller')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, orderController.create)
router.get('/completion/:order_id', authMiddleware, orderController.completion)
router.get('/canceled/:order_id', authMiddleware, orderController.canceled)
router.get('/', authMiddleware, orderController.getUserOrders)

router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders)

module.exports = router
