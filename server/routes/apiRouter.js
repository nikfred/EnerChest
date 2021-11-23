const Router = require('express')
const router = Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('./cartRouter')
const dispenserRouter = require('../routes/dispenserRouter')
const orderRouter = require('../routes/orderRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/dispenser', dispenserRouter)
router.use('/order', orderRouter)

module.exports = router