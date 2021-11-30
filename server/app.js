require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const CronJob = require('cron').CronJob;
const path = require("path")
const apiRouter = require("./routes/apiRouter")
const orderService = require('./services/orderService')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: [["http://20.52.25.145","http://localhost:3000"]]
}))

app.use('/api', apiRouter)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json('Дмитрий Балабан не сделал фронтенд')
})


const job = new CronJob('*/10 * * * *', function() {
    orderService.checkReadyOrder()
}, null, true, 'Europe/Kiev');


start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        job.start();
        app.listen(PORT, () => console.log('Server start on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()