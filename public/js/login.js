const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  //   console.log(JSON.stringify({ username, password }));
  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      let res = await response.json();
      errorMessage(res.message);
      // console.log(message);
      // alert(response.statusText);
    }
  }

  if (!username) {
    errorMessage("Please enter a username to login");
    // alert("please enter a username");
  } else if (!password) {
    errorMessage("Please enter a password to login");

    // alert("please enter a password");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
