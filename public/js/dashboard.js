const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const contents = document.querySelector("#post-content").value.trim();

  if (title && contents) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, contents }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      errorMessage("Failed to create post");
    }
  }
  if (!title) {
    errorMessage("Please enter a title for this post");
    // alert("please enter a title for this post");
  } else if (!contents) {
    errorMessage("Please enter content for this post");

    // alert("please enter content for this post");
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
