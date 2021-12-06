const Router = require('express')
const router = Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, orderController.create)
router.get('/completion/:order_id', authMiddleware, orderController.completion)
router.get('/canceled/:order_id', authMiddleware, orderController.canceled)
router.get('/', authMiddleware, orderController.getUserOrders)

module.exports = router