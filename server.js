const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const API_ENDPOINT = "https://api.openai.com/v1/completions";
const AUTHORIZATION_TOKEN = "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";

app.use(bodyParser.json());

async function generateQuestion(category) {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${AUTHORIZATION_TOKEN}`,
    },
    body: JSON.stringify({
        "model": "text-davinci-003",
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
