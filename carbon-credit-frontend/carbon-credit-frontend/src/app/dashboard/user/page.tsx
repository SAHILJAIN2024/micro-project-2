"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import WalletConnect from "../../../components/ConnectWalletButton";
import TransferToken from "../../../components/TransferToken";
import BalanceChecker from "../../../components/BalanceChecker";
import Profile from "../../../components/Profile";
import TransactionHistory from "../../../components/TransactionHistory";
import CreateRequest from "../../../components/CreateRequest";

import styles from "../../../styles/Dashboarduser.module.css";

const UserDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const walletRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const transferRef = useRef<HTMLDivElement>(null);
  const balanceRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("crx_token");
      if (!token) {
        alert("🚫 Unauthorized: Please login first.");
        router.push("/login");
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("crx_token");
    router.push("/login");
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.title}>Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <main className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <h2 className={styles.logo}>CRX 🌱</h2>
        </div>
        <div className={styles.navRight}>
          <button onClick={() => scrollToSection(profileRef)} className={styles.navButton}>
            Profile
          </button>
          <button onClick={() => scrollToSection(transferRef)} className={styles.navButton}>
            Transfer
          </button>
          <button onClick={() => scrollToSection(balanceRef)} className={styles.navButton}>
            Balance
          </button>
          <button onClick={() => scrollToSection(historyRef)} className={styles.navButton}>
            History
          </button>
          <button onClick={() => scrollToSection(requestRef)} className={styles.navButton}>
            Submit Request
          </button>
          <button onClick={handleLogout} className={styles.navButton}>
            Logout
          </button>
          <div className={styles.walletButton}>
            <WalletConnect />
          </div>
        </div>
      </nav>

      <h1 className={styles.title}>User Dashboard</h1>

      <section ref={profileRef}>
        <Profile />
      </section>

      <div className={styles.cardContainer}>
        <section ref={transferRef}>
          <TransferToken />
        </section>
        <section ref={balanceRef}>
          <BalanceChecker />
        </section>
        <section ref={historyRef}>
          <TransactionHistory />
        </section>
        <section ref={requestRef}>
          <CreateRequest />
        </section>
      </div>
    </main>
  );
};

export default UserDashboard;
