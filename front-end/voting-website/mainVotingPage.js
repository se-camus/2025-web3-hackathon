'use strict';

const selectingButtons = document.querySelectorAll('.select-button'); //Select all the buttons in the webpage 
const allCandidateCards = document.querySelectorAll('.candidate-card');
const confirmationButton = document.querySelector('.confirm-button'); 

let candidate1Vote = 0;
let candidate2Vote = 0;
let candidate3Vote = 0;
let candidate4Vote = 0; 

let selectState = null; // Start with no candidate selected 
let votingContractAddress;
// Load the voting contract address before any interaction
loadVotingContractAddress().then(() => {
    console.log("Voting contract address loaded successfully.");
}).catch(error => {
    console.error("Failed to load voting contract address:", error);
});

// Load the voting contract address dynamically
async function loadVotingContractAddress() {
    try {
        // Detect the chain ID dynamically
        const chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Detected Chain ID:", chainId);

        // Construct the path to the deployed_addresses.json file based on the chain ID
        const filePath = `../../ignition/deployments/chain-${parseInt(chainId, 16)}/deployed_addresses.json`;
        console.log("Fetching deployed addresses from:", filePath);

        // Fetch the deployed addresses
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch deployed_addresses.json: ${response.statusText}`);
        }

        const addresses = await response.json();
        votingContractAddress = addresses["RealMeTokenModule#Ballot1"]; // Adjust key if needed

        if (!votingContractAddress) {
            throw new Error("Voting contract address not found in deployed_addresses.json");
        }

        console.log("Voting Contract Address:", votingContractAddress);
    } catch (error) {
        console.error("Error loading voting contract address:", error);
        alert("Failed to load voting contract address. Please try again later.");
        throw error;
    }
}

async function vote(candidateId) {
    try {
        // Get user's account
        const accounts = await ethereum.request({ 
            method: "eth_requestAccounts" 
        });
        
        // Create function signature for vote(uint256)
        const functionSignature = "0x0121b93f";
        // Pad tokenId to 32 bytes
        const encodedCandidateId = candidateId.toString(16).padStart(64, "0");
        console.log("Transaction Details:");
        console.log("From:", accounts[0]);
        console.log("To:", votingContractAddress);
        console.log("Data:", functionSignature + encodedCandidateId);
        // Send transaction
        const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: accounts[0],
                to: votingContractAddress, // Use the dynamically loaded voting contract address
                data: functionSignature + encodedCandidateId,
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

// Track transaction status
async function watchTransaction(txHash) {
    return new Promise((resolve, reject) => {
        const checkTransaction = async () => {
            try {
                const tx = await ethereum.request({
                    method: "eth_getTransactionReceipt",
                    params: [txHash],
                });

                if (tx) {
                    if (tx.status === "0x1") {
                        resolve(tx);
                    } else {
                        reject(new Error("Transaction failed"));
                    }
                } else {
                    setTimeout(checkTransaction, 2000);
                }
            } catch (error) {
                reject(error);
            }
        };

        checkTransaction();
    });
}

selectingButtons.forEach(button => {
    button.addEventListener('click', function(){
        const candidateID = button.getAttribute('data-candidate');
        const candidateCard = document.getElementById(candidateID);


        allCandidateCards.forEach(card=> {
            card.classList.remove('fade-in-select');
        });

        if(candidateCard){
            candidateCard.classList.add('fade-in-select');
        }



        selectState = candidateID;  //Storing id of the candidate 
        
    })
})

confirmationButton.addEventListener('click', function(){
    let candidateID = 0;
    if (selectState){
        if (selectState === "candidate1"){
            candidate1Vote++;
            console.log(candidate1Vote)
            candidateID = 0;
        } else if (selectState === "candidate2"){
            candidate2Vote++;
            console.log(candidate2Vote);
            candidateID = 1;
        } else if (selectState === "candidate3"){
            candidate3Vote++;
            console.log(candidate3Vote);
            candidateID = 2;
        } else if (selectState === "candidate4"){
            candidate4Vote++;
            console.log(candidate4Vote);
            candidateID = 3;
        } else {
            alert("Invalid Error Selecting Candidate");
        }

    } else {
        alert("Please select a candidate before confirming.");
    }

    console.log(candidateID)
    
    vote(candidateID).then(txHash => {
        console.log(`Transaction sent: ${txHash}`);
        return watchTransaction(txHash);
    }).then(tx => {
        console.log(`Transaction confirmed in block: ${tx.blockNumber}`);
    }).catch(error => {
        console.error(error);
    });

    // alert("Thank you for Voting!");

    // window.location.href = 'success.html';  //Takes the user to successPage! 
})