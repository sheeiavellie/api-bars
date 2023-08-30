const Pool = require('pg').Pool;
const constants = require('./constants');

const pool = new Pool({
    user: constants.dbUser,
    host: constants.dbHost,
    database: constants.dbName,
    password: constants.dbPassword,
    port: "5432",
});

module.exports = pool;