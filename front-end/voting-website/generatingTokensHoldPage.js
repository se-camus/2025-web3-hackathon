document.addEventListener("DOMContentLoaded", async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
    // Existing transition animation
    const mainContent = document.querySelector(".main-container");
    requestAnimationFrame(() => {
        mainContent.style.transform = "translateX(0%)";
        mainContent.style.opacity = "1";
    });

    // Automatic wallet connection
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
            }

            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            
            // You can add UI feedback here if needed
            console.log(`Wallet connected: ${address}`);
            
            return { provider, signer, address };
        } catch (error) {
            console.error('Error connecting wallet:', error);
            // Show error in a more user-friendly way
            if (error.message.includes('MetaMask is not installed')) {
                window.location.href = 'https://metamask.io/download/';
            }
        }
    };

    // Automatically try to connect when page loads
    await connectWallet();

    // Listen for account changes
    window.ethereum?.on('accountsChanged', () => {
        connectWallet();
    });
});