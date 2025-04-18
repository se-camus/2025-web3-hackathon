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


// transition slide off
const mainContent = document.querySelector(".main-container")
const slideContent = (url) => {
  setTimeout(() => {
    mainContent.style.transform = "translateX(-100%)";

    // Wait for the animation to complete before navigating
    setTimeout(() => {
      window.location.href = url;
    }, 500); // Matches the CSS transition duration (500ms)
  }, 300); // Additional delay before starting the animation
};

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector(".main-container")
  requestAnimationFrame(() => {
    mainContent.style.transform = "translateX(0%)";
    mainContent.style.opacity = "1"; // Ensure visibility
  });
});

// nav bar slide up

const navBar = document.querySelector(".navbar")
const removeNav = (url) =>  {
  setTimeout(() => {
    navBar.style.transform = "translateY(-100%)";

    // Wait for the animation to complete before navigating
    setTimeout(() => {
      slideContent(url);
    }, 500); // Matches the CSS transition duration (500ms)
  }, 300); // Additional delay before starting the animation
};
const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector(".sidebar");
hamburger.addEventListener('click', () => {
  showSide();
});

overlay.addEventListener('click', () => {
  hideSide();
});

const showSide = () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
} 

const hideSide = () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
} 

const hideThenSlide = (url) => {
  hideSide();
  slideContent(url);
} 

const mediaQuery = window.matchMedia("(min-width: 769px)");

        function handleScreenResize(e) {
            if (e.matches) { // If screen is larger than 768px
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            }
        }
        mediaQuery.addEventListener("change", handleScreenResize);