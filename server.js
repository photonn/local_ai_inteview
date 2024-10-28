const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

const API_ENDPOINT = process.env.API_ENDPOINT;
const AUTHORIZATION_TOKEN = process.env.AZURE_OPENAI_API_KEY;

if (!API_ENDPOINT) {
  console.error("Error: API_ENDPOINT is not defined in the environment variables.");
  process.exit(1);
}

if (!AUTHORIZATION_TOKEN){
  console.error("Error: AUTHORIZATION_TOKEN is not defined in the environment variables.");
  process.exit(1);
}

app.use(bodyParser.json());

async function generateQuestion(category) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AUTHORIZATION_TOKEN}`,
    },
    body: JSON.stringify({
        "model": "gpt-4o-mini",
        "prompt": `Generate one advanced certification exam question 
                    about ${category} based in real world production
                     issues or code challenges`,
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

async function generateAnswer(question) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AUTHORIZATION_TOKEN}`,
    },
    body: JSON.stringify({
        "model": "gpt-4o-mini",
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

app.post('/generateQuestion', async (req, res) => {
  const { category } = req.body;
  try {
    const question = await generateQuestion(category);
    res.json({ question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/generateAnswer', async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await generateAnswer(question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
