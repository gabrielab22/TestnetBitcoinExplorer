
const express = require('express');
const router = express.Router();
const Client = require('bitcoin-core');

const client = new Client({
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PSW,
    port: process.env.PORT
});

router.get('/', (req, res) => {
    client.getBlockchainInfo().then((err, response) => {
        if (err) {
            res.send(err)
        }
        else {
            return res.json(response)
        }
    })
})

module.exports = router;