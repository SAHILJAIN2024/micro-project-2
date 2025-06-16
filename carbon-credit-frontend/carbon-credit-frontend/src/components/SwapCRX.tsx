// File: components/SwapCRX.tsx
"use client";
import React, { useState } from "react";
import { useWallet } from "./WalletContext";

export default function SwapCRX({ preset, onSuccess }: any) {
  const { address } = useWallet();
  const [amount, setAmount] = useState(preset?.amount.toString() || "");
  const [to, setTo] = useState(preset?.to || address || "");

  const handleSwap = async () => {
    alert(`Swapping ${amount} CRX to ${to}`);
    // Add actual swap logic here (e.g., calling smart contract)
    if (onSuccess) onSuccess();
  };

  return (
    <div>
      <label>Amount</label>
      <input
        type="text"
        value={amount}
        disabled={!!preset?.amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <label>To</label>
      <input
        type="text"
        value={to}
        disabled={!!preset?.to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSwap} className="bg-blue-600 text-white py-2 px-4 rounded">
        Confirm Swap
      </button>
    </div>
  );
}
