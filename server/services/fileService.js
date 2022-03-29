const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const Product = require('../models/product')
const User = require('../models/user')

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
        return fs.unlinkSync(path.resolve(filePath, url))
    }

    async disciplineImage(type) {
        let images
        switch (type) {
            case 'product':
                images = await Product.find({},'imageUrl')
                break
            case 'user':
                images = await User.find({},'imageUrl')
                break
        }
        images = images
            .filter(i => i.imageUrl.indexOf(type))
            .map(i => i.imageUrl)

        const newFilePath = (path.resolve(__dirname, '../static', type)) + path.sep
        if (!fs.existsSync(newFilePath)) {
            fs.mkdirSync(newFilePath, {recursive: true})
        }
        const oldFilePath = path.resolve(__dirname, '../static') + path.sep
        console.log(images)
        for (const image of images) {
            console.log(oldFilePath + image)
            if (fs.existsSync(oldFilePath + image)) {
                fs.renameSync(oldFilePath + image, newFilePath + image, (err =>
                        console.log(err)
                ))
                switch (type) {
                    case 'product':
                        await Product.updateOne({imageUrl: image},{imageUrl: type + '/' + image})
                        break
                    case 'user':
                        await User.updateOne({imageUrl: image},{imageUrl: type + '/' + image})
                        break
                }
            }
        }
        return true
    }
}

module.exports = new FileService()