
document.addEventListener("DOMContentLoaded", async () => {
  // Existing transition animation
  const mainContent = document.querySelector(".main-container");
  requestAnimationFrame(() => {
      mainContent.style.transform = "translateX(0%)";
      mainContent.style.opacity = "1";
  });

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

          // Request account access
          const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
          });

          // const provider = new ethers.BrowserProvider(window.ethereum);
          // console.log(ethers);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();

          updateStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
          
          return { provider, signer, address };
      } catch (error) {
          console.error('Error connecting wallet:', error);
      }
  };

  // Connect automatically when page loads
  await connectWallet();

  // Handle account changes
  window.ethereum?.on('accountsChanged', async () => {
      await connectWallet();
  });

  // Handle network changes
  window.ethereum?.on('chainChanged', () => {
      window.location.reload();
  });
});