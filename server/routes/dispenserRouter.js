const Router = require('express')
const router = Router()
const dispenserController = require('../controllers/dispenserController')

router.post('/create', dispenserController.create)
router.post('/add', dispenserController.addProduct)
router.get('/all', dispenserController.getAllDispenser)

module.exports = router