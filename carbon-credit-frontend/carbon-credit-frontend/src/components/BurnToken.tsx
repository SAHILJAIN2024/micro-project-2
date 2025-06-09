"use client";

import React, { useState } from "react";
import styles from "../styles/Burn.module.css";
import { logTransaction } from "../utils/logTransaction";

const BurnToken: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBurn = async () => {
    setStatus("");

    if (!amount || isNaN(Number(amount))) {
      setStatus("⚠️ Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/token/burn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Burn failed");

      // ✅ Log the burn transaction
      await logTransaction(
        "0xAuthorityAddress", // Replace with actual authority wallet address
        "0x000000000000000000000000000000000000dEaD", // Common burn address
        parseFloat(amount),
        data.txHash
      );

      setStatus(`🔥 Burn successful! Tx Hash: ${data.txHash}`);
      setAmount("");
    } catch (err: any) {
      console.error("Burn error:", err);
      setStatus("❌ Burn failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="number"
        placeholder="Amount to burn"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleBurn} className={styles.button} disabled={loading}>
        {loading ? "Burning..." : "Burn"}
      </button>
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
};

export default BurnToken;
