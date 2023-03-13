const API_ENDPOINT = "https://api.openai.com/v1/completions";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const numQuestions = urlParams.get("numQuestions");
const apikey = urlParams.get("apikey");
const categories = urlParams.get("categories").split(",");
const table = document.getElementById("table");

async function generateQuestion(category) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apikey}`,
    },
    body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": `Generate one advanced certification exam question 
                    about ${category} based in real world production
                     issues or code challenges. Questions should be
                      of multiple choice option type and always have 4 options`,
        "temperature": 0.2,
        "max_tokens": 512,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "echo": false
    }),
  });
  const data = await response.json();
  return data.choices[0].text;
}

async function generateAnswer(question) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apikey}`,
    },
    body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": `Generate an answer for this question: ${question}.`,
        "temperature": 0.7,
        "max_tokens": 512,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0,
        "echo": false
    }),
  });
  const data = await response.json();
  return data.choices[0].text;
}

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
    row.cells[1].textContent = await generateQuestion(row.cells[0].textContent);
    row.cells[2].textContent  = await generateAnswer(row.cells[1].textContent);
  });

  // Append the button to the button cell and the button cell to the row
  buttonCell.appendChild(button);
  row.appendChild(categoryCell);
  row.appendChild(questionCell);
  row.appendChild(answerCell);
  row.appendChild(buttonCell);
  table.appendChild(row);
}


async function getQuestions() {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    for (let j = 0; j < numQuestions; j++) {
      try {
        const question = await generateQuestion(category);
        const answer = await generateAnswer(question);
        addRow(category, question, answer);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
  
getQuestions();
  