const Express = require('express')
const router = Express.Router()
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')


router.post('/registration',

    userController.registration)
router.get('/activate/:link', userController.activate)
router.get('/password/:link', userController.activatePassword)
router.post('/login', userController.login)
router.post('/refresh', userController.refresh)

router.post('/logout', authMiddleware, userController.logout)
router.get('/all', authMiddleware, userController.getAll)
router.get('/', authMiddleware, userController.getUser)
router.put('/password', authMiddleware, userController.updatePassword)
router.put('/', authMiddleware, userController.update)
router.delete('/', authMiddleware, userController.deleteUser)

router.put('/role', authMiddleware, adminMiddleware, userController.updateRole)
router.delete('/:uid', authMiddleware, adminMiddleware, userController.deleteUserBuId)

module.exports = router
