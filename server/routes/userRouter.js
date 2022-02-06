const Express = require('express')
const router = Express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const deleteCacheMiddleware = require('../middleware/deleteCacheMiddleware')


router.post('/registration', userController.registration)
router.get('/activate/:link', userController.activate)
router.post('/login', userController.login)
router.post('/refresh', userController.refresh)

router.post('/logout', authMiddleware, userController.logout)
router.get('/all', authMiddleware, userController.getAll)
router.get('/', authMiddleware, userController.getUser)
router.put('/', authMiddleware, deleteCacheMiddleware, userController.update)
router.delete('/', authMiddleware, deleteCacheMiddleware, userController.deleteUser)

router.put('/role', authMiddleware, adminMiddleware, userController.updateRole)
router.delete('/:uid', authMiddleware, adminMiddleware, userController.deleteUserBuId)

module.exports = router