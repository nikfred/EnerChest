const Router = require('express')
const router = Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.get('/activate/:link', userController.activate)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh', userController.refresh)

router.get('/all', authMiddleware, userController.getAll)
router.get('/', authMiddleware, userController.getUser)
router.put('/', authMiddleware, userController.update)

module.exports = router