"use client";

import React, { useEffect, useState } from "react";
import CommunityPost from "../../components/CommunityPost";

interface Post {
  _id?: string;
  title: string;
  description: string;
  type: string;
  amount: number;
  wallet: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "sell",
    amount: "",
    wallet: "",
  });

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/communitypost");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/communitypost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      setForm({
        title: "",
        description: "",
        type: "sell",
        amount: "",
        wallet: "",
      });
      fetchPosts();
    } catch (err) {
      console.error("Failed to submit post:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Community Marketplace</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="sell">Sell</option>
          <option value="buy">Buy</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Wallet Address"
          value={form.wallet}
          onChange={(e) => setForm({ ...form, wallet: e.target.value })}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "0.75rem",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Post to Marketplace
        </button>
      </form>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => <CommunityPost key={post._id} post={post} />)
      )}
    </div>
  );
}
