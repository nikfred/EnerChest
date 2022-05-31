const Express = require('express')
const router = Express.Router()
const dispenserController = require('../controllers/dispenserController')
const authMiddleware = require('../middleware/authMiddleware')
const staffMiddleware = require('../middleware/staffMiddleware')
const checkCacheMiddleware = require('../middleware/checkCacheMiddleware')
const saveCacheMiddleware = require('../middleware/saveCacheMiddleware')
const deleteCacheMiddleware = require('../middleware/deleteCacheMiddleware')

const staff = [authMiddleware, staffMiddleware, deleteCacheMiddleware]

router.post('/create', ...staff, dispenserController.create)
router.put('/status/:dispenser_id', ...staff, dispenserController.updateStatus)
router.put('/:dispenser_id', ...staff, dispenserController.updateDispenser)
router.post('/add',...staff, dispenserController.addProduct)
router.get('/all', checkCacheMiddleware, dispenserController.getAll, saveCacheMiddleware)
router.get('/:dispenser_id', checkCacheMiddleware, dispenserController.getOne, saveCacheMiddleware)
router.get('/product/:product_id', checkCacheMiddleware, dispenserController.getDispensersWithProduct, saveCacheMiddleware)
router.get('/filling/:dispenser_id', checkCacheMiddleware, dispenserController.getProducts, saveCacheMiddleware)

module.exports = router