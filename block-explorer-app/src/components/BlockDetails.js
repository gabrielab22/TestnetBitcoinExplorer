import React from "react";

function BlockDetails({ block }) {
  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="text-lg font-semibold">Block Details</h3>
      <p className="mt-2">
        <span className="font-semibold">Hash:</span> {block.hash}
      </p>
      <p className="mt-2">
        <span className="font-semibold">Timestamp:</span> {block.time}
      </p>
      <p className="mt-2">
        <span className="font-semibold">Nonce:</span> {block.nonce}
      </p>
      <p className="mt-2">
        <span className="font-semibold">Height:</span> {block.height}
      </p>
      <p className="mt-2">
        <span className="font-semibold">Weight:</span> {block.weight}
      </p>
      <br></br>
      <p className="font-semibold">Transaction:</p>{" "}
      {block.tx.map((tx, index) => (
        <div key={tx}>
          Tx #{index + 1}:
          <br />
          <a
            href={`/transaction-details/${tx}`}
            className="underline text-emerald-400"
          >
            {tx}
          </a>
        </div>
      ))}
    </div>
  );
}

export default BlockDetails;
