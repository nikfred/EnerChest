const Express = require('express')
const router = Express.Router()
const cartController = require('../controllers/cart.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add', authMiddleware, cartController.addProduct)
router.get('/', authMiddleware, cartController.getCart)
router.delete('/:item_id', authMiddleware, cartController.deleteItem)

module.exports = router
