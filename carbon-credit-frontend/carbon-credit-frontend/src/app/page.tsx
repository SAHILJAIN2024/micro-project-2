"use client";

import React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌱 Welcome to the CRX Platform</h1>
      <p className={styles.subtitle}>Create an account or sign in to access the dashboard.</p>
      <div className={styles.buttonGroup}>
        <button onClick={() => router.push("/signup")} className={styles.button}>
          Sign Up
        </button>
        <button onClick={() => router.push("/login")} className={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
}
