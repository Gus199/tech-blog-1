const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment-content").value.trim();

  if (comment) {
    const form = document.querySelector("form");
    const id = form.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}/comments/`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert("Failed to submit comment");
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
