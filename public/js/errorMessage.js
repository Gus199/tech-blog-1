const errorMessage = (message) => {
  const errorDiv = document.querySelector(".error-message");

  errorDiv.lastChild.textContent = message;
  errorDiv.style.display = "block";

  // setTimeout(() => {
  //   errorDiv.style.display = "none";
  // }, 3000);

  errorDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("error-close-button")) {
      errorDiv.style.display = "none";
    }
  });
};
