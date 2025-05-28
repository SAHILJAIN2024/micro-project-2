const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const router = express.Router();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.AUTHORITY_PRIVATE_KEY, provider);
const contractAddress = process.env.CRX_CONTRACT_ADDRESS;

const abi = [
  "function mint(address to, uint256 amount) public",
  "function balanceOf(address account) view returns (uint256)",
  "function burn(uint256 amount) public"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

// ✅ Mint tokens
router.post("/mint", async (req, res) => {
  const { to, amount } = req.body;

  console.log("Received mint request:", { to, amount });

  if (!ethers.isAddress(to)) {
    return res.status(400).json({ message: "Invalid recipient address." });
  }

  try {
    const tx = await contract.mint(to, ethers.parseUnits(amount.toString(), 18));
    console.log("Mint transaction hash:", tx.hash);

    await tx.wait();
    console.log("Mint transaction confirmed:", tx.hash);

    res.status(200).json({ message: "Mint successful", txHash: tx.hash });
  } catch (error) {
    console.error("Mint error:", error);
    res.status(500).json({ message: "Mint failed", error: error.message });
  }
});

// ✅ Check token balance
router.get("/balance/:address", async (req, res) => {
  const { address } = req.params;

  if (!ethers.isAddress(address)) {
    return res.status(400).json({ message: "Invalid address format" });
  }

  try {
    const balance = await contract.balanceOf(address);
    const formatted = ethers.formatUnits(balance, 18);
    console.log(`Balance for ${address}: ${formatted} CRX`);

    res.status(200).json({ balance: formatted });
  } catch (error) {
    console.error("Balance fetch error:", error);
    res.status(500).json({ message: "Failed to fetch balance", error: error.message });
  }
});

// ✅ Burn tokens (from authority wallet)
router.post("/burn", async (req, res) => {
  const { amount } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ message: "Amount is required and must be a number." });
  }

  try {
    const tx = await contract.burn(ethers.parseUnits(amount.toString(), 18));
    console.log("Burn transaction hash:", tx.hash);

    await tx.wait();
    console.log("Burn transaction confirmed:", tx.hash);

    res.status(200).json({ message: "Burn successful", txHash: tx.hash });
  } catch (error) {
    console.error("Burn error:", error);
    res.status(500).json({ message: "Burn failed", error: error.message });
  }
});

module.exports = router;
