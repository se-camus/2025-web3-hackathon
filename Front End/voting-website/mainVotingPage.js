'use strict';

const selectingButtons = document.querySelectorAll('.select-button'); //Select all the buttons in the webpage 
const allCandidateCards = document.querySelectorAll('.candidate-card');
const confirmationButton = document.querySelector('.confirm-button'); 

let candidate1Vote = 0;
let candidate2Vote = 0;
let candidate3Vote = 0;
let candidate4Vote = 0; 

let selectState = null; //Start with no candidate selected 

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
    if (selectState){
        if (selectState === "candidate1"){
            candidate1Vote++;
            console.log(candidate1Vote)
        } else if (selectState === "candidate2"){
            candidate2Vote++;
            console.log(candidate2Vote);
        } else if (selectState === "candidate3"){
            candidate3Vote++;
            console.log(candidate3Vote);
        } else if (selectState === "candidate4"){
            candidate4Vote++;
            console.log(candidate4Vote);
        } else {
            alert("Invalid Error Selecting Candidate");
        }

    } else {
        alert("Please select a candidate before confirming.");
    }

    alert("Thank you for Voting!");

    window.location.href = 'success.html';  //Takes the user to successPage! 
})