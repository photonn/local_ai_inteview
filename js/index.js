const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numQuestions = document.getElementById("numQuestions").value;
  const categories = document.getElementById("categories").value;
  const queryParams = new URLSearchParams();
  queryParams.set("numQuestions", numQuestions);
  queryParams.set("categories", categories);
  window.location.href = `questions.html?${queryParams.toString()}`;
});
