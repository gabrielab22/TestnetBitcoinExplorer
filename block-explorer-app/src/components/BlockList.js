import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import "../styles/tailwind.css";

function BlockList() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        console.log("tu san");
        const response = await axios.get("http://localhost:8080/block/all"); // Update the endpoint
        console.log(response, "RENSPOSNE");

        setBlocks(response.data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    }

    fetchBlocks();
  }, []);

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.hash}
              className={`p-4 border rounded cursor-pointer ${
                selectedBlock === block ? "bg-gray-300" : ""
              }`}
              onClick={() => handleBlockClick(block)}
            >
              Block #{block.confirmations}
            </div>
          ))}
        </div>
        {selectedBlock && (
          <div className="mt-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">Block Details</h3>
            <p className="mt-2">
              <span className="font-semibold">Hash:</span> {selectedBlock.hash}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Timestamp:</span>{" "}
              {selectedBlock.time}
            </p>
            {/* Add more block details here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlockList;
