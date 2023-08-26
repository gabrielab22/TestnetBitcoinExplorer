const express = require("express");
const router = express.Router();
const client = require("../config/blockchainClient.js");

router.get("/last", async (req, res) => {
  try {
    console.log("tuu");
    const block = await fetchLatestBlockInfo();

    return res.json(block);
  } catch {
    return res.status(404).send("Last blok not found");
  }
});

router.get("/:blockHash", async (req, res) => {
  try {
    const { blockHash } = req.params;

    const block = await getBlockByHash(blockHash);
    return res.json(block);
  } catch {
    return res.status(404).send("Block not found");
  }
});

const fetchLatestBlockInfo = async () => {
  try {
    const blockchainInfo = await client.getBlockchainInfo();
    const latestBlockNumber = blockchainInfo.blocks;
    const latestBlockInfo = await fetchBlockInfo(latestBlockNumber);
    return latestBlockInfo;
  } catch (error) {
    throw error;
  }
};

const fetchBlockInfo = async (blockNum) => {
  const blockHash = await client.getBlockHash(blockNum);
  const blockInfo = await client.getBlock(blockHash);
  return blockInfo;
};

const getBlockByHash = async (blockHash) => {
  const blockInfo = await client.getBlock(blockHash);
  const blockStats = await client.getBlockStats(blockHash);
  return { ...blockInfo, ...blockStats };
};

module.exports = router;
