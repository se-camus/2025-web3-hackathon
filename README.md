# 2025 Web3 Hackathon - Soul ID 
https://youtu.be/CzM22fvxnUs  DEMONSTRATION OF FINAL PRODUCT 
Welcome to the **2025 Web3 Hackathon** project repository! This project was developed as part of New Zealand's FIRST Web3 Hackathon. Our team, **Soul ID**, won **first place in the Governance challenge 👑🥇** sponsored by 🔥_🔥 DAO (Fireeyes).

## 🚀 Project Overview
**Soul ID** is a decentralized voting system prototype that utilizes **Soulbound Tokens (SBT)** for authentication and identity verification. By leveraging SBTs, our system ensures that only verified users can participate in governance decisions, preventing identity fraud and enhancing transparency. The voting process is fully on-chain, allowing for trustless, immutable, and efficient decision-making.


## 🛠️ Tech Stack
- **Smart Contracts:** Solidity (Hardhat for deployment)
- **Frontend:** HTML + CSS + JavaScript
- **Authentication:** MetaMask Wallet Integration
- **Blockchain:** Ethereum Sepolia (testnet)

## 📂 Project Structure
```
2025-web3-hackathon/
│── contracts/        # Solidity smart contracts
│── frontend/         # JavaScript-based frontend
│── scripts/         # Deployment and interaction scripts
│── test/            # Smart contract tests
│── hardhat.config.js # Hardhat configuration
│── package.json     # Project dependencies
│── README.md        # This file
```

## 🔧 Setup & Installation
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Hardhat
- MetaMask (web browser extension)

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/se-camus/2025-web3-hackathon.git
   cd 2025-web3-hackathon
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
4.     
4. Compile smart contracts:
   ```sh
   npx hardhat compile
   ```
5. Deploy contracts (on a testnet or local Hardhat network):
   ```sh
   npx hardhat run scripts/deploy.js --network <network>
   ```
6. Start the frontend:
   ```sh
   TO ADD
   ```
## Deploying to the Sepolia Ethereum Testnet
TO ADD

## 🗳️ How It Works
1. **User Authentication with SBT:** Each participant is issued a **Soulbound Token (SBT)**, which acts as proof of identity and eligibility to vote.
2. **Wallet Connection:** Users connect their MetaMask wallet through a webhook, verifying their SBT ownership.
3. **Casting a Vote:** Once authenticated, users can securely cast their vote. The system ensures that each wallet can only vote once, preventing duplicate submissions.
4. **Immutable Vote Recording:** Every vote is permanently recorded on the blockchain, ensuring full transparency and tamper-proof governance.

## 📜 Smart Contract Highlights
- **voting.sol**: Implements a decentralized and tamper-proof voting system, ensuring that each vote is securely cast and stored on the blockchain.
- **minting_contract.sol**: Ensures that only authorized entities can mint new tokens, preventing unauthorized issuance and maintaining the integrity of the authentication system.

## 📢 Acknowledgments
- The **Web3 Hackathon organizers** for hosting this event
- **🔥_🔥 DAO** (Fireeyes) for sponsoring the Governance challenge

## 📄 License
This project is open-source under the **MIT License**.

---
Made with ❤️ by the **Soul ID** team 
