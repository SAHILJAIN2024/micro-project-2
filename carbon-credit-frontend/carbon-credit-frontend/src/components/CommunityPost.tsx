import React from "react";
import styles from "../styles/Community.module.css";

interface Post {
  title: string;
  description: string;
  type: string;
  amount: number;
  wallet: string;
}

export default function CommunityPost({ post }: { post: Post }) {
  return (
    <div className={styles.postCard}>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.description}>{post.description}</p>
      <p className={`${styles.meta} ${post.type === "buy" ? styles.typeBuy : styles.typeSell}`}>
        <strong>Type:</strong> {post.type.toUpperCase()}
      </p>
      <p className={styles.meta}><strong>Amount:</strong> {post.amount} CRX</p>
      <p className={styles.meta}><strong>Wallet:</strong> {post.wallet}</p>
    </div>
  );
}
