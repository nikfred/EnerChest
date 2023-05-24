module.exports = function (err, req, res, next) {
    console.log(err)
    return res.status(err.status || 500).json({message: err.message || "Непредвиденая ошибка"})
}
