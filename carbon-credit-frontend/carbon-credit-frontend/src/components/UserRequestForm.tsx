// components/UserRequestForm.tsx
import { useState } from "react";

const UserRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    walletAddress: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("✅ Request submitted:", data);
      alert("Request submitted!");
      setFormData({ name: "", walletAddress: "", reason: "" });
    } catch (err) {
      console.error("❌ Error submitting request:", err);
      alert("Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a Request</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        name="walletAddress"
        value={formData.walletAddress}
        onChange={handleChange}
        placeholder="Wallet Address"
        required
      />
      <textarea
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        placeholder="Why are you requesting this?"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserRequestForm;
