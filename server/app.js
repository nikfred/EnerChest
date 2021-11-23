require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path = require("path")
const apiRouter = require("./routes/apiRouter")
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cookieParser())
app.use(cors())

app.use('/api', apiRouter)

app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json('Дмитрий Балабан не сделал фронтенд')
})

start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, () => console.log('Server start on port ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start()