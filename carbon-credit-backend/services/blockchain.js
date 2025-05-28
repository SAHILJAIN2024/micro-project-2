const { ethers } = require('ethers');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = [ /* Insert your ERC-20 ABI here */ ];

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

module.exports = contract;
