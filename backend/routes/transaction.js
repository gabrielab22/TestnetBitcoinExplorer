const express = require("express");
const router = express.Router();
const client = require("../config/blockchainClient.js");

router.get("/:txid", async (req, res) => {
  try {
    const { txid } = req.params;
    if (!txid) {
      return res.status(404).send("Not found");
    }
    const transaction = await getTransaction(txid);
    return res.json(transaction);
  } catch {
    return res.status(404).send("Not found");
  }
});

const calculateTransactionFee = async (transaction) => {
  const totalOutputSum = transaction.vout.reduce(
    (prev, { value }) => prev + value,
    0
  );

  let totalInputSum = 0;

  for (var i = 0; i < transaction.vin.length; i++) {
    const inputTransactionRaw = await client.getRawTransaction(
      transaction.vin[i].txid
    );
    const inputTransactionDecoded = await client.decodeRawTransaction(
      inputTransactionRaw
    );
    const inputTransactionOutputSum = inputTransactionDecoded.vout.reduce(
      (prev, { value }) => prev + value,
      0
    );
    totalInputSum += inputTransactionOutputSum;
  }

  return totalInputSum - totalOutputSum;
};

const getTransaction = async (txid) => {
  const transactionRaw = await client.getRawTransaction(txid);
  const transactionInfo = await client.decodeRawTransaction(transactionRaw);
  const isCoinbaseTransaction = transactionInfo.vin.some(
    (input) => input.coinbase
  );

  const fee = isCoinbaseTransaction
    ? null
    : await calculateTransactionFee(transactionInfo);
  const outputsSum = transactionInfo.vout.reduce(
    (prev, { value }) => prev + value,
    0
  );
  return {
    ...transactionInfo,
    fee,
    outputsSum,
    inputsSum: outputsSum + fee,
    isCoinbaseTransaction,
  };
};

module.exports = router;
