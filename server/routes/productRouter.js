const Express = require('express')
const router = Express.Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const checkCacheMiddleware = require('../middleware/checkCacheMiddleware')
const saveCacheMiddleware = require('../middleware/saveCacheMiddleware')
const deleteCacheMiddleware = require('../middleware/deleteCacheMiddleware')

const admin = [authMiddleware, adminMiddleware, deleteCacheMiddleware]

router.post('/create', ...admin, productController.createProduct)
router.put('/update/:product_id', ...admin, productController.update)
router.put('/activate/:product_id', ...admin, productController.activate)
router.delete('/:product_id', ...admin, productController.delete)

router.get('/all', checkCacheMiddleware, productController.getAll, saveCacheMiddleware)
router.get('/brands', productController.getAllBrands)
router.get('/sizes', productController.getAllSizes)
router.get('/search', checkCacheMiddleware, productController.search, saveCacheMiddleware)
router.get('/:product_id', productController.getOne)


module.exports = router