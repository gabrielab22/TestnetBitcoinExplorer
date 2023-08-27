import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/tailwind.css";
import "../index.css";

function TransactionDetalis() {
    const [transaction, setTransaction] = useState([]);

    const { txid } = useParams();

    useEffect(() => {
        async function fetchTransactionDetails() {
            try {
                if (!txid) {
                    throw new Error("No transaction id provided");
                }

                const response = await axios.get(`http://localhost:8080/transaction/${txid}`);

                setTransaction(response.data);
            } catch (error) {
                console.error("Error fetching blocks:", error);
            }
        }

        fetchTransactionDetails();
    }, []);

    useEffect(() => {
        console.log(Object.keys(transaction), "SELECTED BLOCK");
    }, [transaction]);

    const displayKeys = [
        'txid',
        'hash',
        'size',
        'weight',
        'fee',
        'outputsSum',
        'inputsSum',
    ];

    return (
        <div className="mt-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">Transaction Details</h3>
            {displayKeys.map((key) => (
                <p className="mt-2">
                    <span className="font-semibold">{key}:</span> {transaction[key]}
                </p>
            ))}
        </div>
    );
}

export default TransactionDetalis;
