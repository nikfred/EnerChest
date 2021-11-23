const Router = require('express')
const router = Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, adminMiddleware, productController.createProduct)
router.put('/update/:product_id', authMiddleware, adminMiddleware, productController.update)
router.put('/activate/:product_id', authMiddleware, adminMiddleware, productController.activate)
router.delete('/:product_id', authMiddleware, adminMiddleware, productController.delete)

router.get('/all', productController.getAll)
router.get('/:product_id', productController.getOne)
router.get('/byBrand/:brand_id', productController.getByBrand)

module.exports = router