document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop();
    
    // Handle nav link active states
    const navLinks = document.querySelectorAll(".nav-links a, .login-btn");
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  
    // Add active class to register button on register.html
    const registerBtn = document.querySelector(".register-btn");
    if (currentPath === "register.html" && registerBtn) {
      registerBtn.classList.add("active");
    }
  });
  