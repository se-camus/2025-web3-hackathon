'use strict';

const selectingButtons = document.querySelectorAll('.select-button'); //Select all the buttons in the webpage 
const allCandidateCards = document.querySelectorAll('.candidate-card');
const confirmationButton = document.querySelector('.confirm-button'); 

let candidate1Vote = 0;
let candidate2Vote = 0;
let candidate3Vote = 0;
let candidate4Vote = 0; 

let selectState = null; //Start with no candidate selected 

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
      
      // Send transaction
      const txHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: accounts[0],
          to: "0xF011043B18900dE5cbd1Ef864d9495b59c87c405",
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