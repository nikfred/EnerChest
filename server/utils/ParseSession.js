module.exports = (req) => {
    const i = req.rawHeaders.indexOf('User-Agent') + 1
    const device = req.rawHeaders[i].split(/[()]/)[1]
    const remote = req._remoteAddress.split(':').pop()
    return {remote, device}
}