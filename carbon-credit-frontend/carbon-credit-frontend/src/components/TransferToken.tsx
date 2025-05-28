"use client";

import React, { useState } from "react";
import styles from "../styles/Transfer.module.css";
import { useContract } from "../utils/contract";
import { parseUnits, isAddress } from "ethers";

export default function TransferToken() {
  const contract = useContract(); // ✅ moved to top level
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (!contract) {
        setMessage("⚠️ Connect your wallet.");
        return;
      }

      if (!recipient || !amount) {
        setMessage("⚠️ Please provide recipient and amount.");
        return;
      }

      if (!isAddress(recipient)) {
        setMessage("❌ Invalid Ethereum address.");
        return;
      }

      const parsedAmount = parseUnits(amount, 18);
      const tx = await contract.transfer(recipient, parsedAmount);
      await tx.wait();

      setMessage("✅ Tokens transferred!");
      setRecipient(""); // Optional: Clear inputs
      setAmount("");
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Transfer CRX Tokens</h1>

      <input
        type="text"
        className={styles.input}
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />

      <input
        type="number"
        className={styles.input}
        placeholder="Amount to Transfer"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className={styles.button}
        onClick={handleTransfer}
        disabled={loading}
      >
        {loading ? "Transferring..." : "Transfer"}
      </button>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
