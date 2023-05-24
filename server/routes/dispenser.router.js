const Express = require('express')
const router = Express.Router()
const dispenserController = require('../controllers/dispenser.controller')
const authMiddleware = require('../middleware/authMiddleware')
const staffMiddleware = require('../middleware/staffMiddleware')

router.post('/create', authMiddleware, staffMiddleware, dispenserController.create)
router.put('/status/:dispenser_id', authMiddleware, staffMiddleware, dispenserController.updateStatus)
router.put('/:dispenser_id', authMiddleware, staffMiddleware, dispenserController.updateDispenser)
router.post('/add',authMiddleware, staffMiddleware, dispenserController.addProduct)
router.get('/all', dispenserController.getAll)
router.get('/:dispenser_id', dispenserController.getOne)
router.get('/product/:product_id', dispenserController.getDispensersWithProduct)
router.get('/filling/:dispenser_id', dispenserController.getProducts)

module.exports = router
