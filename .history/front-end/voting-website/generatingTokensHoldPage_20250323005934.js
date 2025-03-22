document.addEventListener("DOMContentLoaded", async () => {
  // Existing transition animation
  const mainContent = document.querySelector(".main-container");
  requestAnimationFrame(() => {
      mainContent.style.transform = "translateX(0%)";
      mainContent.style.opacity = "1";
  });

let sendAddress ="0xd73A84582aD4756cdEc733d26bB74863fdCfEA31";
let uniqueID = 200;

  const updateStatus = (message) => {
      const statusElement = document.getElementById('walletStatus');
      if (statusElement) {
          statusElement.textContent = message;
      }
  };

  const updateMessage = (message) => {
      const messageElement = document.getElementById('hold-message');
      if (messageElement) {
          messageElement.textContent = message;
      }
  }

  // Add a button to connect the wallet
  const connectButton = document.createElement('button');
  connectButton.textContent = "Connect Wallet"; 
  connectButton.className = "button"; // Assuming the button in mainVotingPage.html has this class
  connectButton.style.marginTop = "20px"; // Adjust as needed to position below the spinner


  const connectWallet = async () => {
      try {
          if (!window.ethereum) {
              throw new Error("MetaMask is not installed");
          }

          updateStatus("Connecting to MetaMask...");

          const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
          });
          const address = accounts[0];
          updateStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
          updateMessage('Minting your token...');
          await mintToken(uniqueID, address);
          updateMessage('Sending you to the voting page...');
          setTimeout(() => {
            window.location.href = `./mainVotingPage.html`;
          }, 7000)
          
          return { address };
      } catch (error) {
          console.error('Error:', error);
          updateStatus('Error connecting wallet');
          throw error;
      }
  };

  async function mintToken(uniqueID, address) { 
    try {
      // Get user's account
      const accounts = await ethereum.request({ 
        method: "eth_requestAccounts" 
      });
      
      // Create function signature for vote(uint256)
      const functionSignature = "0x62bdfceb";
      // Pad tokenId to 32 bytes
      const encodedUniqueID = uniqueID.toString(16).padStart(64, "0");
      const encodedAddress = address.toLowerCase().replace("0x", "").padStart(64, "0"); // Pad to 32 bytes
      // Send transaction
      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: accounts[0],
          to: "0x963ecBf662A9c5859d734F65eB2760cD928B8a8B",
          data: functionSignature + encodedUniqueID + encodedAddress,
        }],
      });
  
      return txHash;
    } catch (error) {
      if (error.code === 4001) {
        throw new Error("Transaction rejected by user");
      }
      throw error;
    }
  }

  // Auto-connect after 1 second
  setTimeout(async () => {
      try {
          await connectWallet();
      } catch (error) {
          console.log("Auto-connect failed, user can still connect manually");
      }
  }, 1000);

  connectButton.addEventListener('click', async () => {
      await connectWallet();
  });

  // Handle account changes
  window.ethereum?.on('accountsChanged', async () => {
      await connectWallet();
  });

  // Handle network changes
  window.ethereum?.on('chainChanged', () => {
      window.location.reload();
  });
});