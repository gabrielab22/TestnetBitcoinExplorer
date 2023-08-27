const express = require("express");
const router = express.Router();
const client = require("../config/blockchainClient.js");

router.get("/all", async (req, res) => {
  try {
    const blockchainInfo = await client.getBlockchainInfo();
    const latestBlockHeight = blockchainInfo.blocks;

    const numBlocksToFetch = Math.min(5, latestBlockHeight - 1);
    const blocks = [];

    for (
      let height = latestBlockHeight;
      height > latestBlockHeight - numBlocksToFetch;
      height = height - 1
    ) {
      const blockHash = await client.getBlockHash(height);
      const blockInfo = await client.getBlock(blockHash);
      blocks.push(blockInfo);
    }

    res.json(blocks);
  } catch (error) {
    return res.status(404).send("Blocks not found");
  }
});

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

router.get("number/:num", async (req, res) => {
  try {
    console.log("blabla");
    const { blockNum } = req.params;
    console.log(blockNum);

    const block = await fetchBlockInfo(blockNum);
    return res.json(block);
  } catch {
    return res.status(404).send("Block not found");
  }
});

const fetchLatestBlockInfo = async () => {
  try {
    const blockchainInfo = await client.getBlockchainInfo();
    const latestBlockNumber = blockchainInfo.blocks;
    console.log(latestBlockNumber);
    const latestBlockInfo = await fetchBlockInfo(latestBlockNumber);
    return latestBlockInfo;
  } catch (error) {
    throw error;
  }
};

const fetchBlockInfo = async (blockNumber) => {
  try {
    const blockHash = await client.getBlockHash(blockNumber);
    const blockInfo = await client.getBlock(blockHash);
    return blockInfo;
  } catch (error) {
    throw new Error("Unable to fetch block");
  }
};

const getBlockByHash = async (blockHash) => {
  try {
    const blockInfo = await client.getBlock(blockHash);
    const blockStats = await client.getBlockStats(blockHash);
    return { ...blockInfo, ...blockStats };
  } catch (error) {
    throw new Error("Unable to fetch block by hash");
  }
};

module.exports = router;
