console.time("Boot time")

require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const CronJob = require('cron').CronJob;
const logger = require('morgan')
const apiMetrics = require('prometheus-api-metrics');

const apiRouter = require("./routes/api.router")
const orderService = require('./services/order.service')
const dispenserService = require('./services/dispenser.service')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const pid = process.pid
const PORT = process.env.PORT || 5000

const app = express()

app.use(logger('dev'));
app.use(express.json())
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors())
app.use(apiMetrics());

app.use('/api', apiRouter)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json('Дмитрий Балабан не сделал фронтенд')
})


const job = new CronJob('* * * * *', function() {
    orderService.checkReadyOrder()
    dispenserService.clear()
}, null, true, 'Europe/Kiev');


start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        job.start();
        app.listen(PORT, () => console.log(`Server start on port = ${PORT}, pid = ${pid}`))
    } catch (e) {
        console.log(e)
    }
}

start().then(() => console.timeEnd("Boot time"))


