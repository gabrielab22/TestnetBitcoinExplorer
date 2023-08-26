const express = require("express");
const router = express.Router();
const client = require("../config/blockchainClient.js");

router.get("/", async (req, res) => {
  try {
    const myBlockchain = await client.getBlockchainInfo();
    return res.json(myBlockchain);
  } catch {
    return res.status(404).send("Blockchain not found");
  }
});

module.exports = router;
