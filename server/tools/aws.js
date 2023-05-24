const AWS = require('aws-sdk')

// Configure and authenticate with AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Initialize S3 module
let s3 = new AWS.S3();

const uploadFile = async (file, type = 'static') => {
    const fileContent = Buffer.from(file.data, 'binary')
    const {Location: url} = await s3.upload({
        Bucket: process.env.AWS_NAME,
        Body: fileContent,
        Key: `${type}/${file.name}`
    }).promise()
    return url
}

const removeFile = async (url) => {
    url = decodeURI(url).split('.com/')[1]
    return await s3.deleteObject({
        Bucket: process.env.AWS_NAME,
        Key: url
    }).promise()
}

const removeMultipleFiles = async (urls) => {
    for (const url of urls) {
        await removeFile(url)
    }
}

module.exports = {
    uploadFile,
    removeFile,
    removeMultipleFiles
}
