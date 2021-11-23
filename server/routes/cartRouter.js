const Router = require('express')
const router = Router()
const cartController = require('../controllers/cartController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add', authMiddleware, cartController.addProduct)
router.get('/', authMiddleware, cartController.getCart)
router.delete('/:product_id', authMiddleware, cartController.deleteProduct)

module.exports = router