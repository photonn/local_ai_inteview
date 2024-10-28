const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const numQuestions = urlParams.get("numQuestions");
const categories = urlParams.get("categories").split(",");
const table = document.getElementById("table");

function addRow(category, question, answer) {
  const row = document.createElement("tr");
  const categoryCell = document.createElement("td");
  categoryCell.textContent = category;
  const questionCell = document.createElement("td");
  questionCell.style.whiteSpace = "pre-wrap";
  questionCell.textContent = question;
  const answerCell = document.createElement("td");
  answerCell.style.whiteSpace = "pre-wrap";
  answerCell.textContent = answer;

  // Create the button cell and button element
  const buttonCell = document.createElement("td");
  const button = document.createElement("button");
  button.textContent = "Regenerate";

  // Add an event listener to the button to handle the click event
  button.addEventListener("click", async () => {
    // Regenerate the question and answer for the row
    row.cells[1].textContent = "Generating..."
    row.cells[2].textContent = "Generating..."
    row.cells[1].textContent = await fetchQuestion(row.cells[0].textContent);
    row.cells[2].textContent  = await fetchAnswer(row.cells[1].textContent);
  });

  // Append the button to the button cell and the button cell to the row
  buttonCell.appendChild(button);
  row.appendChild(categoryCell);
  row.appendChild(questionCell);
  row.appendChild(answerCell);
  row.appendChild(buttonCell);
  table.appendChild(row);
}

async function fetchQuestion(category) {
  const response = await fetch("/generateQuestion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  });
  const { question } = await response.json();
  return question;
}

async function fetchAnswer(question) {
  const response = await fetch("/generateAnswer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });
  const { answer } = await response.json();
  return answer;
}

async function getQuestions() {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    for (let j = 0; j < numQuestions; j++) {
      try {
        const question = await fetchQuestion(category);
        const answer = await fetchAnswer(question);
        addRow(category, question, answer);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

getQuestions();
