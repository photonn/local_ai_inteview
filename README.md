# Interview Question Generator

This project generates interview questions based on user input. The user can specify the number of questions per category and the categories they want to generate questions for. The project will use AI from Azure OpenAI to generate questions and answers. You will need an Azure OpenAI API key to use this project.

## Usage

1. Clone the repository:
   ```
   git clone https://github.com/photonn/local_ai_inteview.git
   cd local_ai_inteview
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Azure OpenAI API key and API endpoint:
   ```
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key
   API_ENDPOINT=your_api_endpoint
   ```

4. Start the server:
   ```
   node server.js
   ```

5. Open `main.html` in your browser.

6. Enter the number of questions per category in the "Number of questions per category" field.

7. Enter the categories you want to generate questions for in the "Categories" field (comma-separated).

8. Click on "Submit".

9. The page will then display a table with generated interview questions and their answers.

## Files

- `main.html`: The main page where users can enter their preferences for generating interview questions.
- `questions.html`: The page that displays generated interview questions and their answers.
- `css/main.css`: Stylesheet for `main.html`.
- `css/questions.css`: Stylesheet for `questions.html`.
- `js/index.js`: JavaScript file that handles user input and generates interview questions on `main.html`.
- `js/questions.js`: JavaScript file that displays generated interview questions on `questions.html`.
- `server.js`: Server-side code that handles requests for generating questions and answers using the Azure OpenAI API and `gpt-4o-mini` model.

## .gitignore

The `.gitignore` file has been updated to include common entries for Node.js projects, such as `node_modules/`, `dist/`, `*.log`, and retains the existing entry for `.env`.
