require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    scroll: {
      url: "https://sepolia-rpc.scroll.io/",  // Scroll Sepolia Testnet
      accounts: [process.env.PRIVATE_KEY],
    },
    vanar: {
      url: "https://rpc-vanguard.vanarchain.com",  // Vanar Chain
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
