document.addEventListener("DOMContentLoaded", async () => {
  const mainContent = document.querySelector(".main-container");
  requestAnimationFrame(() => {
    mainContent.style.transform = "translateX(0%)";
    mainContent.style.opacity = "1";
  });

  let uniqueID = 20232424144;
  let hasMinted = false; // Flag to track minting status
  let mintingContractAddress = ""; // Placeholder for the minting contract address

  const updateStatus = (message) => {
    const statusElement = document.getElementById("walletStatus");
    if (statusElement) {
      statusElement.textContent = message;
    }
  };

  const updateMessage = (message) => {
    const messageElement = document.getElementById("hold-message");
    if (messageElement) {
      messageElement.textContent = message;
    }
  };

  const loadMintingContractAddress = async () => {
    try {
      const response = await fetch("deployed_addresses.json");
      const addresses = await response.json();
      mintingContractAddress = addresses["RealMeTokenModule#RealMeToken"];
      console.log("Minting Contract Address:", mintingContractAddress);
    } catch (error) {
      console.error("Error loading minting contract address:", error);
      throw new Error("Failed to load minting contract address.");
    }
  };

  const connectButton = document.createElement("button");
  connectButton.textContent = "Connect Wallet";
  connectButton.className = "button";
  connectButton.style.marginTop = "20px";

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }

      updateStatus("Connecting to MetaMask...");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];

      updateStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
      updateMessage("Minting your token...");

      // Ensure minting happens only once
      if (!hasMinted) {
        hasMinted = true;
        await mintToken(uniqueID, address);
        updateMessage("Sending you to the voting page...");
        setTimeout(() => {
          window.location.href = `./mainVotingPage.html`;
        }, 7000);
      } else {
        console.log("Token already minted, skipping duplicate transaction.");
      }

      return { address };
    } catch (error) {
      console.error("Error:", error);
      updateStatus("Error connecting wallet");
      throw error;
    }
  };

  async function mintToken(uniqueID, address) {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      const functionSignature = "0x62bdfceb";
      const encodedUniqueID = uniqueID.toString(16).padStart(64, "0");
      const encodedAddress = address.toLowerCase().replace("0x", "").padStart(64, "0");

      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: mintingContractAddress, // Use the dynamically loaded minting contract address
            data: functionSignature + encodedUniqueID + encodedAddress,
          },
        ],
      });

      return txHash;
    } catch (error) {
      if (error.code === 4001) {
        throw new Error("Transaction rejected by user");
      }
      throw error;
    }
  }

  // Load the minting contract address before anything else
  await loadMintingContractAddress();

  // Auto-connect after 1 second
  setTimeout(async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.log("Auto-connect failed, user can still connect manually");
    }
  }, 1000);

  connectButton.addEventListener("click", async () => {
    await connectWallet();
  });

  window.ethereum?.on("accountsChanged", async () => {
    await connectWallet();
  });

  window.ethereum?.on("chainChanged", () => {
    window.location.reload();
  });
});
  