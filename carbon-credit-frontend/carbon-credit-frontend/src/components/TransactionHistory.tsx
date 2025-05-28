
"use client";
import React, { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  date: string;
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "12px", marginTop: "20px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>📄 Transaction History</h2>
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            transactions.map((tx) => (
              <li
                key={tx._id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "4px",
                }}
              >
                <strong>{tx.type}</strong> of {tx.amount} CRX on{" "}
                {new Date(tx.date).toLocaleDateString()}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
