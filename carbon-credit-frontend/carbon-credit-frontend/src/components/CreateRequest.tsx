"use client";

import React, { useState } from "react";
import styles from "../styles/CreateRequest.module.css";

const CreateRequest: React.FC = () => {
  const [requestType, setRequestType] = useState("mint");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !amount) {
      setMessage("❗ Address and amount are required.");
      return;
    }

    const formData = new FormData();
    formData.append("type", requestType);
    formData.append("address", address);
    formData.append("amount", amount);
    formData.append("notes", notes);
    if (file) formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const result = await response.json();
      setMessage("✅ Request submitted successfully!");
      setRequestType("mint");
      setAddress("");
      setAmount("");
      setNotes("");
      setFile(null);
    } catch (err) {
      setMessage("❌ Failed to submit request.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📨 Submit Token Request</h2>
      <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
        <label className={styles.label}>
          Type:
          <select
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            className={styles.select}
          >
            <option value="mint">Mint</option>
            <option value="burn">Burn</option>
          </select>
        </label>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Wallet Address"
          className={styles.input}
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className={styles.input}
          min="1"
        />

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add optional notes or justification..."
          className={styles.textarea}
        />

        <input
          type="file"
          onChange={handleFileChange}
          className={styles.fileInput}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        />

        <button type="submit" className={styles.button}>
          Send Request
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default CreateRequest;
