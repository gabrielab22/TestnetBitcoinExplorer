
const express = require('express');
const router = express.Router();
const client = require("../config/blockchainClient.js");

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