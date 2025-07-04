"use client";

import React, { useState, useEffect } from "react";
import MintToken from "../../../components/MintToken";

import styles from "../../../styles/Dashboard.module.css";
import WalletConnect from "../../../components/ConnectWalletButton";
import Navbar from "../../../components/Navbarauthority";

interface Request {
  _id: string;
  wallet: string;
  reason: string;
  amount: number;
  status: string;
}

const RequestDashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/requests");
        const data = await res.json();
        const pendingRequests = data.filter((r: Request) => r.status === "pending");
        setRequests(pendingRequests);
      } catch (error) {
        console.error("❌ Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}/approve`, {
        method: "PUT",
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("❌ Error approving request:", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}/reject`, {
        method: "PUT",
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("❌ Error rejecting request:", err);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />

      {/* Dashboard Heading Section */}
      <section id="dashboard" className={styles.section}>
        <h1 className={styles.title}>AUTHORITY DASHBOARD</h1>
        <div className={styles.application}>
          <h2>Pending Applications</h2>
          {loading ? (
            <p>Loading requests...</p>
          ) : (
            <ul className={styles.list}>
              {requests.length === 0 ? (
                <p>No pending requests.</p>
              ) : (
                requests.map((req) => (
                  <li key={req._id} className={styles.listItem}>
                    <p><strong>Reason:</strong> {req.reason}</p>
                    <p><strong>Wallet Address:</strong> {req.wallet}</p>
                    <p><strong>Amount:</strong> {req.amount}</p>
                    <div className={styles.buttonGroup}>
                      <button
                        onClick={() => handleApprove(req._id)}
                        className={styles.approveButton}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className={styles.rejectButton}
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </section>

      {/* Mint Section */}
      <section id="mint" className={styles.section}>
        <h2>Mint CRX Tokens</h2>
        <MintToken />
      </section>

    </div>
  );
};

export default RequestDashboard;
