"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/Auth.module.css"; // Adjust path if needed

export default function UserSignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    wallet: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Signup Data:", form);
    // Usually you'd send this to backend
    alert("User signed up successfully!");
    router.push("/login/user");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Sign Up</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          type="text"
          name="wallet"
          placeholder="Wallet Address"
          value={form.wallet}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
