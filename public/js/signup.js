const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      errorMessage("Failed to signup user");
    }
  }
  if (!username) {
    errorMessage("Please enter a username to sign up");
    // alert("please enter a username for this post");
  } else if (!password) {
    errorMessage("Please enter a password to sign up");

    // alert("please enter a password for this post");
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
