const Router = require('express')
const router = Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.get('/orders', authMiddleware, adminMiddleware, orderController.getAllOrderStats)

module.exports = router