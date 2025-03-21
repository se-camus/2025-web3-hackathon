// Add hover effects and simple animations
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card")
  const button = document.querySelector(".button")  //Change these to querySelectorAll if we want to add more cards/buttons

  // Add click event listeners to buttons
  //Need to do 'forEach' if there are multiple buttons 
    button.addEventListener("click", function () {
      // Simple feedback on click
      this.style.transform = "scale(0.98)"

      setTimeout(() => {
        this.style.transform = "scale(1)"

        // Get the button text to determine which path to take
        const buttonText = this.textContent.trim()

        if (buttonText === "Get Verified") {
          alert("Redirecting to voter verification process...")
          // In a real app, you would redirect to the verification page
          // window.location.href = '/verification';
        } //Add another conditional if we decide to add more cards/buttons
      }, 150)
    })
  

  // Add subtle hover effects to cards
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  
})
