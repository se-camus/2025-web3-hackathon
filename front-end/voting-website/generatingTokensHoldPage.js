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

          // Request account access
          const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
          });

          const provider = new providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          updateStatus(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
          
          // Dummy smart contract interaction
          const contractAddress = "0x45E654E9Bd6921c444287D85530cD1f5072df711";
          const abi = [{"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"uniqueId","type":"uint256"}],"name":"isUniqueIdUsed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"uniqueId","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"safeMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];

          const contract = new ethers.Contract(contractAddress, abi, signer);
          const result = await contract.safeMint(uniqueID, sendAddress);
          console.log("Dummy function result:", result);

          // Navigate to the home page
          window.location.href = "../index.html";
          
          return { provider, signer, address };
      } catch (error) {
          console.error('Error connecting wallet:', error);
          updateStatus('Error connecting wallet');
      }
  };

  // Add a button to connect the wallet
  const connectButton = document.createElement('button');
  connectButton.textContent = "Connect Wallet";
  connectButton.className = "styled-button"; // Assuming the button in mainVotingPage.html has this class
  connectButton.style.marginTop = "20px"; // Adjust as needed to position below the spinner

  connectButton.addEventListener('click', async () => {
      await connectWallet();
  });

  const spinner = document.querySelector('.spinner'); // Assuming there's a spinner element
  if (spinner) {
      spinner.insertAdjacentElement('afterend', connectButton);
  } else {
      document.body.appendChild(connectButton);
  }

  // Handle account changes
  window.ethereum?.on('accountsChanged', async () => {
      await connectWallet();
  });

  // Handle network changes
  window.ethereum?.on('chainChanged', () => {
      window.location.reload();
  });
});