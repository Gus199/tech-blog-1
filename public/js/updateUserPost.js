const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const contents = document.querySelector("#post-content").value.trim();
  const form = document.querySelector("form");

  if (title && contents) {
    const id = form.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, contents }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      errorMessage("Failed to update post");
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

const delButtonHandler = async () => {
  const form = document.querySelector("form");
  const id = form.getAttribute("data-id");

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete project");
  }
};

document
  .querySelector(".update-post-form")
  .addEventListener("submit", updateFormHandler);

document
  .querySelector(".delete-post-button")
  .addEventListener("click", delButtonHandler);
