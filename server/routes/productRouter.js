const Express = require('express')
const router = Express.Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/create', authMiddleware, adminMiddleware, productController.createProduct)
router.put('/update/:product_id', authMiddleware, adminMiddleware, productController.update)
router.put('/activate/:product_id', authMiddleware, adminMiddleware, productController.activate)
router.delete('/:product_id', authMiddleware, adminMiddleware, productController.delete)

router.get('/all', productController.getAll)
router.get('/brands', productController.getAllBrands)
router.get('/sizes', productController.getAllSizes)
router.get('/search', productController.search)
router.get('/:product_id', productController.getOne)


module.exports = router