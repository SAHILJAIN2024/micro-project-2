"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../../components/WalletContext";
import styles from "../../styles/Auth.module.css";

export default function LoginPage() {
  const { address, connectWallet } = useWallet();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!address) return alert("Please connect your wallet first!");
    if (!email) return alert("Please enter your email!");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, wallet: address }),
      });

      const data = await response.json();
      console.log("Login API response:", data);

      if (!response.ok || !data.role) throw new Error(data.message || "Login failed");

      localStorage.setItem("crx_token", data.token);

      if (data.role === "authority") {
        router.push("/dashboard/authority");
      } else if (data.role === "user") {
        router.push("/dashboard/user");
      } else {
        throw new Error("Unknown role returned from server.");
      }
    } catch (err: any) {
      alert(`\u274C Login error: ${err.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>\uD83D\uDD10 Login</h1>

        {!address ? (
          <button onClick={connectWallet} className={styles.button}>
            Connect Wallet
          </button>
        ) : (
          <p className={styles.connectedWallet}>
            Connected Wallet: <strong>{address.slice(0, 6)}...{address.slice(-4)}</strong>
          </p>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <button onClick={handleLogin} className={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

