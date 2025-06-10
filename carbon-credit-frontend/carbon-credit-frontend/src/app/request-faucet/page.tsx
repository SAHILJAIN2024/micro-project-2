import React from "react";

const RequestFaucetPage = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>💧 Request Sepolia ETH</h2>
      <p>
        Your CRX tokens have been burned successfully. To receive Sepolia ETH in return,
        please submit your wallet address using our faucet form.
      </p>
      <p>
        👉 Fill this form:{" "}
        <a
          href="https://forms.gle/example-faucet-form"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#3366cc", fontWeight: "bold" }}
        >
          Google Form
        </a>
      </p>
    </div>
  );
};

export default RequestFaucetPage;
