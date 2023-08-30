const dotenv = require("dotenv");
dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const buckerEndPoint = process.env.END_POINT;
const signedURLExpires = 3600;

const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB;
const dbPassword = process.env.DB_PASSWORD;

module.exports = {
    bucketName,
    bucketRegion,
    accessKey,
    secretAccessKey,
    buckerEndPoint,
    signedURLExpires,
    dbUser,
    dbHost,
    dbName,
    dbPassword,
};