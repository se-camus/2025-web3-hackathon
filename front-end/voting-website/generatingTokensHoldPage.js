document.addEventListener("DOMContentLoaded", async () => {
  // Existing transition animation
  const mainContent = document.querySelector(".main-container");
  requestAnimationFrame(() => {
      mainContent.style.transform = "translateX(0%)";
      mainContent.style.opacity = "1";
  });
let sendAddress ="0xd73A84582aD4756cdEc733d26bB74863fdCfEA31";
let uniqueID = "2";
  const updateStatus = (message) => {
      const statusElement = document.getElementById('walletStatus');
      if (statusElement) {
          statusElement.textContent = message;
      }
  };

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
          
          return { address };
      } catch (error) {
          console.error('Error:', error);
          updateStatus('Error connecting wallet');
          throw error;
      }
  };

//      // Contract interaction using MetaMask's native methods
//      const contractAddress = "0x45E654E9Bd6921c444287D85530cD1f5072df711";
          
//      // Encode the function call
//      const encodedFunction = {
//          from: address,
//          to: contractAddress,
//          data: `0x${abi.encodeFunctionData('safeMint', [uniqueID, sendAddress]).slice(2)}`
//      };

//      // Send the transaction
//      const result = await window.ethereum.request({
//          method: 'eth_sendTransaction',
//          params: [encodedFunction],
//      });

//      console.log("Transaction hash:", result);
     
//      // Navigate to home page after successful transaction
//      window.location.href = "../index.html";
     
//      return { address };
//  } catch (error) {
//      console.error('Error:', error);
//  }

  // Add a button to connect the wallet
  const connectButton = document.createElement('button');
  connectButton.textContent = "Connect Wallet";
  connectButton.className = "button"; // Assuming the button in mainVotingPage.html has this class
  connectButton.style.marginTop = "20px"; // Adjust as needed to position below the spinner

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