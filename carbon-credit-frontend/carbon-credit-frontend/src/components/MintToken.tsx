"use client";

import React, { useState } from "react";
import styles from "../styles/Mint.module.css";
import { logTransaction } from "../utils/logTransaction";

const MintToken: React.FC = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setStatus("");
    if (!recipient || !amount) {
      setStatus("⚠️ All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/token/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: recipient, amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Minting failed, please try again.");
      }

      // ✅ Log the transaction to backend
      await logTransaction(
        "0xAuthorityAddress", // Replace with actual authority address if dynamic
        recipient,
        parseFloat(amount),
        data.txHash // optional if available from backend
      );

      setStatus(`✅ Minted successfully! Transaction Hash: ${data.txHash}`);
      setRecipient("");
      setAmount("");
    } catch (err: any) {
      console.error("Minting error:", err);
      setStatus("❌ Minting failed: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className={styles.input}
      />
      <input
        type="number"
        placeholder="Amount to mint"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleMint} className={styles.button} disabled={loading}>
        {loading ? "Minting..." : "Mint"}
      </button>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
};

export default MintToken;
