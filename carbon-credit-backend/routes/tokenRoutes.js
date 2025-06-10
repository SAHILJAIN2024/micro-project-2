require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const router = express.Router();

// ✅ Load ABI
const contractABI = require("../abi/CRXToken.json");

// ✅ Environment Variables
const contractAddress = process.env.CRX_CONTRACT_ADDRESS;
const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;

// ✅ Environment Validation
if (!contractAddress) throw new Error("🚨 CRX_CONTRACT_ADDRESS is not set in .env");
if (!rpcUrl) throw new Error("🚨 RPC_URL is not set in .env");
if (!privateKey) throw new Error("🚨 PRIVATE_KEY is not set in .env");

// ✅ Ethers Setup
const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// ✅ POST /api/token/mint
router.post("/mint", async (req, res) => {
  try {
    const { to, amount } = req.body;

    const tx = await contract.mint(to, ethers.parseUnits(amount.toString(), 18));
    await tx.wait();

    res.json({ message: "✅ Tokens minted", txHash: tx.hash });
  } catch (err) {
    console.error("❌ Mint error:", err.message);
    res.status(500).json({ message: "Minting failed" });
  }
});

// // ✅ POST /api/token/burn
// router.post("/burn", async (req, res) => {
//   try {
//     const { from, amount } = req.body;

//     const tx = await contract.burnFrom(from, ethers.parseUnits(amount.toString(), 18));
//     await tx.wait();

//     res.json({ message: "🔥 Tokens burned", txHash: tx.hash });
//   } catch (err) {
//     console.error("❌ Burn error:", err.message);
//     res.status(500).json({ message: "Burning failed" });
//   }
// });

// ✅ GET /api/token/balance/:address
router.get("/balance/:address", async (req, res) => {
  const { address } = req.params;

  try {
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ message: "⚠️ Invalid wallet address" });
    }

    const balance = await contract.balanceOf(address);
    const formatted = ethers.formatUnits(balance, 18); // Assuming 18 decimals

    res.status(200).json({ balance: formatted });
  } catch (err) {
    console.error("❌ Balance error:", err.message);
    res.status(500).json({ message: "Error fetching balance" });
  }
});

module.exports = router;



// require("dotenv").config();
// const express = require("express");
// const { ethers } = require("ethers");
// const router = express.Router();


// const contractABI = require("../abi/CRXToken.json");

// // ✅ Load environment variables
// const contractAddress = process.env.CRX_CONTRACT_ADDRESS;
// const rpcUrl = process.env.RPC_URL;
// const privateKey = process.env.PRIVATE_KEY;

// if (!contractAddress) {
//   throw new Error("🚨 CRX_CONTRACT_ADDRESS is not set in .env");
// }
// if (!rpcUrl) {
//   throw new Error("🚨 RPC_URL is not set in .env");
// }
// if (!privateKey) {
//   throw new Error("🚨 PRIVATE_KEY is not set in .env");
// }

// const provider = new ethers.JsonRpcProvider(rpcUrl);
// const wallet = new ethers.Wallet(privateKey, provider);
// const contract = new ethers.Contract(contractAddress, contractABI, wallet);


// // POST /api/token/mint
// router.post("/mint", async (req, res) => {
//   try {
//     const { to, amount } = req.body;
//     const tx = await contract.mint(to, ethers.parseUnits(amount.toString(), 18));
//     await tx.wait();
//     res.json({ message: "Tokens minted", txHash: tx.hash });
//   } catch (err) {
//     console.error("Mint error:", err.message);
//     res.status(500).json({ message: "Minting failed" });
//   }
// });

// // POST /api/token/burn
// router.post("/burn", async (req, res) => {
//   try {
//     const { from, amount } = req.body;
//     const tx = await contract.burnFrom(from, ethers.parseUnits(amount.toString(), 18));
//     await tx.wait();
//     res.json({ message: "Tokens burned", txHash: tx.hash });
//   } catch (err) {
//     console.error("Burn error:", err.message);
//     res.status(500).json({ message: "Burning failed" });
//   }
// });

// module.exports = router;
