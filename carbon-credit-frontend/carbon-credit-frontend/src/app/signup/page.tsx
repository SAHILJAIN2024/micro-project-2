"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../../components/WalletContext";
import styles from "../../styles/Auth.module.css";

export default function SignupPage() {
  const { address, connectWallet } = useWallet();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"authority" | "user" | null>(null);

  const handleSignup = async () => {
    if (!address) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!role) {
      alert("Please select a role to sign up.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, wallet: address, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert(`✅ Signed up successfully as ${role}!`);
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(`❌ Signup error: ${err.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Sign Up</h1>

        {!address ? (
          <button onClick={connectWallet} className={styles.button}>
            Connect Wallet
          </button>
        ) : (
          <>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              ✅ Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <button
              onClick={connectWallet}
              className={styles.button}
              style={{ backgroundColor: "#f57c00" }}
            >
              🔄 Change Account
            </button>
          </>
        )}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setRole("authority")}
            className={styles.button}
            style={{ backgroundColor: role === "authority" ? "#004d40" : "#00796b" }}
          >
            Authority
          </button>
          <button
            onClick={() => setRole("user")}
            className={styles.button}
            style={{ backgroundColor: role === "user" ? "#004d40" : "#00796b" }}
          >
            User
          </button>
        </div>

        <button onClick={handleSignup} className={styles.button}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
