const Express = require('express')
const router = Express.Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const dispenserRouter = require('./dispenserRouter')
const orderRouter = require('./orderRouter')
const statsRouter = require('./statsRouter')
const reviewRouter = require('./reviewRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/dispenser', dispenserRouter)
router.use('/order', orderRouter)
router.use('/stats', statsRouter)
router.use('/review', reviewRouter)

module.exports = router