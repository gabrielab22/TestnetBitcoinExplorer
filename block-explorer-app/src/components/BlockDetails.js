import React from "react";
import { Link } from "react-router-dom";

function BlockDetails({ block }) {
  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="text-lg font-semibold">Block Details</h3>
      <p className="mt-2">
        <span className="font-semibold">Hash:</span> {block.hash}
      </p>
      <p className="mt-2">
        <span className="font-semibold">Timestamp:</span>{" "}
        {block.time}
      </p>
      <span className="font-semibold">Transaction:</span>{" "}
      {block.tx.map(
        (tx, index) => (
          <div key={tx}>
            Tx #{(index + 1)}:
            <br />
            <a href={`/transaction-details/${tx}`} className="underline text-emerald-400">
              {tx}
            </a>
          </div>
        ))}

    </div>
  );
}

export default BlockDetails;
