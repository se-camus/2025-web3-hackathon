
//Transition 
document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector(".main-container")
    requestAnimationFrame(() => {
      mainContent.style.transform = "translateX(0%)";
      mainContent.style.opacity = "1"; // Ensure visibility
    });
  });
  