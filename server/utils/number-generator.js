module.exports = function (length = 1) {
    const min = 10 ** (+length-1)
    const max = +('9'.repeat(length))
    return Math.round(Math.random() * (max - min) + min)
}