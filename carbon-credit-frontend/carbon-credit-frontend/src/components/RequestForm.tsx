// components/UserRequestForm.tsx
import { useState } from "react";

const UserRequestForm = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      walletAddress,
      message,
    };

    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("✅ Request submitted successfully!");
        setWalletAddress("");
        setMessage("");
      } else {
        const errorText = await response.text();
        setStatus(`❌ Submission failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setStatus("❌ Network error. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Submit Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Wallet Address"
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message or Reason"
          required
          rows={4}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
};

export default UserRequestForm;
