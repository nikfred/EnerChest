const {Router} = require('express')
const router = Router()
const userRouter = require('./user.router')
const productRouter = require('./product.router')
const cartRouter = require('./cart.router')
const dispenserRouter = require('./dispenser.router')
const orderRouter = require('./order.router')
const statsRouter = require('./stats.router')
const reviewRouter = require('./review.router')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/dispenser', dispenserRouter)
router.use('/order', orderRouter)
router.use('/stats', statsRouter)
router.use('/review', reviewRouter)

module.exports = router
