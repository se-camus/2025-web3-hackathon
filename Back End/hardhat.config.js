require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.22" },
      { version: "0.8.28" }
    ],
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};


