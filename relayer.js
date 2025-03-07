require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables
const SCROLL_RPC_URL = process.env.SCROLL_RPC_URL;
const VANAR_RPC_URL = process.env.VANAR_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const LOCK_CONTRACT_ADDRESS = process.env.LOCK_CONTRACT_ADDRESS;
const BRIDGE_CONTRACT_ADDRESS = process.env.BRIDGE_CONTRACT_ADDRESS;

// Connect to Scroll & Vanar
const scrollProvider = new ethers.JsonRpcProvider(SCROLL_RPC_URL);
const vanarProvider = new ethers.JsonRpcProvider(VANAR_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, vanarProvider);

// Load contract ABIs
const LOCK_ABI = [
  "event Deposit(address indexed user, uint256 amount, bytes32 txHash)",
];
const BRIDGE_ABI = [
  "function releaseTokens(address user, uint256 amount, bytes32 txHash) external",
];

// Load contracts
const scrollLockContract = new ethers.Contract(LOCK_CONTRACT_ADDRESS, LOCK_ABI, scrollProvider);
const vanarBridgeContract = new ethers.Contract(BRIDGE_CONTRACT_ADDRESS, BRIDGE_ABI, wallet);

// Relayer function
async function listenForDeposits() {
    console.log("🔍 Listening for deposits on Scroll...");
    
    scrollLockContract.on("Deposit", async (user, amount, txHash) => {
        console.log(`✅ Deposit detected: User ${user} sent ${ethers.formatEther(amount)} ETH`);

        try {
            const tx = await vanarBridgeContract.releaseTokens(user, amount, txHash);
            console.log(`🚀 Released ${ethers.formatEther(amount)} tokens on Vanar | Tx: ${tx.hash}`);
        } catch (error) {
            console.error("❌ Error processing transaction:", error);
        }
    });
}

// Start the relayer
listenForDeposits();
