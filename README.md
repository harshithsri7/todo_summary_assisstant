Todo List Summary Assisstant 
Deployed URL:
(https://todo-summary-assisstant-5732-git-main-harshithsri7s-projects.vercel.app)

Project Overview:
This is Todolist Summary assisstant that helps users to manage their tasks efficiently by summarizing pending todo tasks with the help of LLM(Large Language Models) and delivering summaries directly to slack channel and as well the application ui. The application consists of a React frontend and  Node.js(express) backend, integrated with Cohere.Ai Api and Slack Api.

Features:

* Add, Edit , Delete Todo tasks.
* Categorize tasks as completed to pending
* Generate concise summaries of pending tasks using LLM.
* Automatically sneding summaries to Slack channel and dislplay of the summaries in Application UI.
* Environment variable are used to store Api keys securely.

******************

Tech Stack Used:
FrontEnd : React.js
Backend: Node.js(Express)
Database:Supabase 
LLM API : Cohere API
Messaging: Slack API

*******************

Setup Instructions

- Node.js installed
- Git installed
- Accounts and API keys for:
- Cohere.ai(https://cohere.com/)
- Slack  (https://api.slack.com/)

 Backend Setup
 1. Clone the repository:
   git clone https://github.com/harshithsri7/todo_summary_assisstant.git

 2. Navigate to the server folder:
   cd YOUR_REPO/server

 3. Install dependencies:
   npm install

 4. Create a .env file with your API keys based on .env.example:
   Cohere.API.KEY=your_openai_api_key
   SLACK_BOT_TOKEN=your_slack_bot_token
   SLACK_SIGNING_SECRET=your_slack_signing_secret
   DATABASE_URL=your_database_url 

 5. Start the backend server:
   npm start

 Frontend Setup
 1. Navigate to the client folder:
   cd ../client

 2. Install dependencies:
   npm install

 3. Start the frontend:
   npm star

*****************

Setup & Configuration Guidance

* To the   project working with Slack and Cohere, follow these easy steps:

Slack Setup:

* Go to Slack API and create a new Slack app for your workspace.(from scratch)

* In the app settings, go to Incoming Webhooks and enable them.

* Create a new webhook URL for the channel where you want to send messages.

* Copy the webhook URL — this is your SLACK_WEBHOOK_URL.

Cohere Setup:

* Sign up at cohere.ai and log in.

* Go to your dashboard and create an API key.

* Copy the API key — this is your COHERE_API_KEY.


*****************************

 Design and Architecture- 


 * The frontend handles task management and user interaction.
 * The backend handles API requests, interacts with the LLM and Slack APIs, and manages task
 data.
* Environment variables are used to protect sensitive keys.* Slack integration allows real-time delivery of task summaries 
* LLM integration automates natural language summarization of todos.

********************************************

Deployment Architecture and Hosting Overview-
  
The application is deployed using a modern full-stack approach: the React-based frontend is hosted on Vercel, leveraging its optimized CDN and seamless integration for fast and reliable user experience.
Meanwhile, the backend API is deployed on Render, providing a scalable and secure server environment that handles all data processing and interactions. This separation ensures efficient performance, easy maintenance, and smooth scalability for both frontend and backend components.

*******
Notes 
* Refer to .env.example for the list of required environment variables
