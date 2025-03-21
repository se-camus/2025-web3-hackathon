// Add hover effects and simple animations
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card")
  const buttons = document.querySelectorAll(".button")

  // Add click event listeners to buttons
  buttons.forEach((button) => {
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
        } else if (buttonText === "Vote Now") {
          alert("Redirecting to voting portal...")
          // In a real app, you would redirect to the voting page
          // window.location.href = '/vote';
        }
      }, 150)
    })
  })

  // Add subtle hover effects to cards
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})

