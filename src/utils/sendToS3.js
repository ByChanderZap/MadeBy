const { config } = require('../config/index');
const { v4: uuid_v4 } = require('uuid');
const AWS = require('aws-sdk');
const bucketName = config.aws_bucket_name;

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: config.aws_access_id,
        secretAccessKey: config.aws_access_secret
    }
})

const sendImageS3 = (file) => {
    let myFile = file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: bucketName,
        Key: `${uuid_v4()}.${fileType}`,
        Body: file.buffer,
        ACL: 'public-read'
    }
    return s3.upload(params).promise();
}

module.exports = sendImageS3;
