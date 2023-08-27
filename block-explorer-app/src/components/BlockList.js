import React, { useState, useEffect } from "react";
import "../index.css";
import axios from "axios";
import "../styles/tailwind.css";
import BlockDetails from "./BlockDetails";

function BlockList() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        const response = await axios.get("http://localhost:8080/block/all"); // Update the endpoint

        setBlocks(response.data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    }

    fetchBlocks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.hash}
              className={`p-4 border rounded cursor-pointer ${selectedBlock === block ? "bg-gray-300" : ""
                }`}
              onClick={() => setSelectedBlock(block)}
            >
              Block #{block.confirmations}
            </div>
          ))}
        </div>
        {!!selectedBlock && <BlockDetails block={selectedBlock} />}
      </div>
    </div>
  );
}

export default BlockList;
