import React, { useState, useEffect } from "react";
import axios from "axios";

function BlockList() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchBlocks() {
      try {
        console.log("tu san");
        const response = await fetch("http://localhost:3000/block/all"); // Update the endpoint
        console.log(response, "RENSPOSNE");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    }

    fetchBlocks();
  }, []);

  return (
    <div>
      <h1>Block Explorer</h1>
      <ul>
        {blocks.map((block, index) => (
          <li key={block.hash}>
            <h2>Block {index + 1}</h2>
            <p>Block Hash: {block.hash}</p>
            {/* Display other relevant information */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlockList;
