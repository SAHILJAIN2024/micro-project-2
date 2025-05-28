"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../styles/Auth.module.css"; // Adjust path as needed

export default function AuthoritySignup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    organization: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Authority Signup Data:", form);
    // Here you’d usually send data to backend
    alert("Authority signed up successfully!");
    router.push("/login/authority");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Authority Sign Up</h2>
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
          name="organization"
          placeholder="Organization Name"
          value={form.organization}
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
