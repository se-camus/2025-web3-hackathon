# 2025 Web3 Hackathon - Soul ID 
[Watch the Demo](https://youtu.be/CzM22fvxnUs) 🎥  

Welcome to the **2025 Web3 Hackathon** project repository! This project was developed as part of New Zealand's FIRST Web3 Hackathon. Our team, **Soul ID**, won **first place in the Governance challenge 👑🥇**, sponsored by **🔥_🔥 DAO (Fireeyes)**.

---

## 🚀 Project Overview
**Soul ID** is a decentralized voting system prototype that leverages **Soulbound Tokens (SBT)** for authentication and identity verification. By utilizing SBTs, the system ensures that only verified users can participate in governance decisions, preventing identity fraud and enhancing transparency. The voting process is fully on-chain, enabling trustless, immutable, and efficient decision-making.

Key Features:
- **Decentralized Authentication:** SBTs ensure only eligible participants can vote.
- **Immutable Voting Records:** Votes are permanently stored on the blockchain.
- **Transparent Governance:** The system guarantees tamper-proof and auditable results.

---

## 🛠️ Tech Stack
- **Smart Contracts:** Solidity (Hardhat for deployment)
- **Frontend:** HTML + CSS + JavaScript
- **Authentication:** MetaMask Wallet Integration
- **Blockchain:** Ethereum Sepolia (testnet)

---

## 🔧 Setup & Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js & npm**
- **MetaMask** (web browser extension)
- **Git Bash** (Only if you are on Windows)

### Installation Steps
1. Clone the repository:
   ```
   git clone https://github.com/se-camus/2025-web3-hackathon.git
   cd 2025-web3-hackathon
   ```
2. Obtain your private and public key for the wallet you want to be the governing entity.
3. Obtain your RPC URL for Ethereum Sepolia through [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/).
4. Run the deploy script (If you are on Windows, ensure you are using Git Bash):
   ```
   npm run deploy
   ```
5. Input the private key, RPC URL, and public key when prompted.
6. When prompted, type `y` to confirm and upload the contracts to the Sepolia network.
7. Once the deployment is complete, a local website will automatically launch, allowing you to interact with the voting system. The website should open at:
   ```
   http://localhost:8080/voting-website/
   ```

---

## 🗳️ How It Works
1. **User Authentication with SBT:**  
   Each participant is issued a **Soulbound Token (SBT)** by a governing authority, which acts as proof of identity and eligibility to vote. These tokens are non-transferable, ensuring that only the rightful owner can use them. The governing authority ensures that the issuance process is secure and that only eligible participants receive the tokens.

2. **Wallet Connection:**  
   Users connect their MetaMask wallet through a webhook, verifying their SBT ownership. The system checks the blockchain to confirm that the wallet holds the required SBT.

3. **Casting a Vote:**  
   Once authenticated, users can securely cast their vote. The system ensures that each wallet can only vote once by recording the voting status on-chain, preventing duplicate submissions.

4. **Immutable Vote Recording:**  
   Every vote is permanently recorded on the blockchain, ensuring full transparency and tamper-proof governance. The results can be verified by anyone with access to the blockchain.

---

## 🧪 Unit Tests
This project includes a comprehensive suite of unit tests to ensure the reliability and correctness of the smart contracts. The tests are written using the Hardhat framework and Chai assertion library. They cover the following scenarios:
- **Token Minting:** Ensures that only authorized entities can mint tokens and that duplicate token IDs are not allowed.
- **Voting Logic:** Verifies that only wallets holding SBTs can vote, prevents double voting, and ensures votes are correctly recorded.
- **Ownership Validation:** Confirms that only the contract owner can perform restricted actions.
- **Edge Cases:** Tests for invalid inputs, such as attempting to vote without a token or minting tokens with duplicate IDs.

To run the tests, use the following command:
```
npx hardhat test
```

---

## 📂 Project Structure
```
2025-web3-hackathon/
│── contracts/        # Solidity smart contracts
│── frontend/         # JavaScript-based frontend
│── ignition/         # Scripts for deploying contracts
│── scripts/          # Deployment and interaction scripts
│── test/             # Smart contract tests
│── hardhat.config.js # Hardhat configuration
│── package.json      # Project dependencies
│── README.md         # This file
│── Working Demo.mp4  # Video of the working demo
```

---

## 📜 Smart Contract Highlights
- **voting.sol:**  
  Implements a decentralized and tamper-proof voting system, ensuring that each vote is securely cast and stored on the blockchain.

- **minting_contract.sol:**  
  Ensures that only authorized entities can mint new tokens, preventing unauthorized issuance and maintaining the integrity of the authentication system.

---

## 📢 Acknowledgments
- The **Web3 Hackathon organizers** for hosting this event.
- **🔥_🔥 DAO** (Fireeyes) for sponsoring the Governance challenge.

---

Made with ❤️ by the **Soul ID** team
