"use client";

import React, { useState, useEffect } from "react";
import { ethers, parseUnits, isAddress } from "ethers";
import styles from "../styles/Transfer.module.css";
import { useContract } from "../utils/contract";
import { logTransaction } from "../utils/logTransaction";

import { MetaMaskInpageProvider } from "@metamask/providers";

const getEthereum = (): MetaMaskInpageProvider | undefined => {
  if (typeof window !== "undefined") {
    return window.ethereum as MetaMaskInpageProvider;
  }
  return undefined;
};



export default function TransferToken() {
  const contract = useContract();
  const [sender, setSender] = useState<string>("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Automatically connect MetaMask and get wallet address
  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setSender(accounts[0]);
        } else {
          setMessage("⚠️ MetaMask not detected.");
        }
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    };

    connectWallet();
  }, []);

  const handleTransfer = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (!contract) {
        setMessage("⚠️ Contract not connected.");
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

      // Log transaction to backend
      await logTransaction(sender || "unknown", recipient, parseFloat(amount), tx.hash);

      setMessage("✅ Tokens transferred!");
      setRecipient("");
      setAmount("");
    } catch (err: any) {
      console.error("Transfer error:", err);
      setMessage("❌ Transfer failed: " + err.message);
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

      <button className={styles.button} onClick={handleTransfer} disabled={loading}>
        {loading ? "Transferring..." : "Transfer"}
      </button>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
