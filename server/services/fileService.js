const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class FileService {
    async save(file, type) {
        const filePath = path.resolve(__dirname, '../static', type)
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, {recursive: true})
        }
        console.log(file)
        const fileExtension = file.name.split('.').pop()
        const imageUrl = uuid.v4() + "." + fileExtension
        await file.mv(path.resolve(filePath, imageUrl))
        return `${type}/${imageUrl}`
    }

    async remove(fileUrl) {
        const [type, url] = fileUrl.split('/')
        const filePath = path.resolve(__dirname, '../static', type)
        let isExist
        console.log(path.resolve(filePath, url))
        isExist = fs.existsSync(path.resolve(filePath, url))
        console.log(`isExist = ${isExist}`)
        return isExist ? fs.unlinkSync(path.resolve(filePath, url)) : 0
    }
}

module.exports = new FileService()