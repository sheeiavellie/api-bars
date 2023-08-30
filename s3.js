const EasyYandexS3 = require('easy-yandex-s3').default;
const AWS = require('aws-sdk');
const constants = require("./constants");

const s3 = new EasyYandexS3({
    auth: {
        accessKeyId: constants.accessKey,
        secretAccessKey: constants.secretAccessKey,
    },
    Bucket: constants.bucketName,
});

AWS.config.update({ region: constants.bucketRegion, 
    accessKeyId: constants.accessKey, 
    secretAccessKey: constants.secretAccessKey
});
const client = new AWS.S3({
    endpoint: 'https://storage.yandexcloud.net',
});

const getSignedUrl = async (dir, imageName) => {
    const action = 'getObject';
  
    let params = {
      Bucket: constants.bucketName,
      Key: `${dir}${imageName}.png`,
      //test Key: `images/amogus.png`,
      Expires: Number(3600),
    };
  
    const signedURL = await new Promise((resolve, reject) => {
      client.getSignedUrl(action, params, (err, url) => {
        if (err) {
          reject(err);
        } else {
          resolve(url);
        }
      });
    });
  
    return { signedURL, objectURL: `https://${constants.bucketName}.storage.yandexcloud.net${params.Key}`, expensive: params.Expires };
  };

module.exports = {
    s3,
    getSignedUrl,
};