const Client = require('bitcoin-core');
const { HOST, PORT, BLOCK_USERNAME, PSW } = process.env;

const client = new Client({
    host: HOST,
    username: BLOCK_USERNAME,
    password: PSW,
    port: PORT
});

module.exports = client;