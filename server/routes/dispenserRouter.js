const Router = require('express')
const router = Router()
const dispenserController = require('../controllers/dispenserController')
const authMiddleware = require('../middleware/authMiddleware')
const staffMiddleware = require('../middleware/staffMiddleware')

router.post('/create', authMiddleware, staffMiddleware, dispenserController.create)
router.post('/add', authMiddleware, staffMiddleware, dispenserController.addProduct)
router.get('/all', dispenserController.getAllDispenser)

module.exports = router