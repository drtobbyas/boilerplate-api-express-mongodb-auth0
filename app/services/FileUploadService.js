const AWS = require('aws-sdk');
const multer = require('multer');
const config = require('../../config/app');

const storage = multer.memoryStorage();
const uploadProvider = multer({
  storage,
  limits: {
    fileSize: 10485760,
  },
});

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

const BUCKET_NAME = config.aws.bucket.public;

module.exports = {
  getIncomingFileHandler() {
    return uploadProvider.single('resource');
  },

  uploadFromStream(fileStream) {
    return fileStream;
  },

  async upload(fileData, name) {
    const fileName = generateFileName(name);
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(fileData),
      ACL: 'public-read',
    };
    const uploadResult = await s3.upload(uploadParams).promise();
    return {
      url: uploadResult.Location || '',
    };
  },
};


const generateFileName = (fileOriginalName) => {
  const maxRandValue = new Date().getTime();
  const randValue = (Math.random() * (maxRandValue - 1)) + maxRandValue;
  return `${randValue}_${maxRandValue}_${fileOriginalName}`;
};
