# TodoList App
Welcome to the vite-react app for ToDo List. This app user for track the ToDo List, and build with

## Project Overview 
A TypeScript-react applciation for the retrive ToDo List data from `https://dummyjson.com/docs`. 

## Features 
- Login page where user authenticated.
- single page applicaton 
- state manaagement - userinfo Persisted
- Todo List based on user ID
- pagination applciaion details
- ToDo list based on completed or not

## Geeting Started
## Prerequisits 
- Nodejs(16+)
- NPM

## Setup Instructions
1. Clone the repository:

   ```bash
   git clone https://github.com/abishkar123/Nimbly-test.git
   
   ```
2. Clone the repository:
   ```bash
   cd Nimbly
   npm install
   ```

3. Running the Application 
   ```bash
   npm run dev 
   ```
4. Run the test
   ```bash
   npm test
   ```

## Project Strcuture 

- src/: Contain the soruce code of the application.
 - compontents/:  all custom components ex-Header
 - page/: contain all pages such a login, Todolist page
 - private-route: route the page based on authentication
 - useAuth:/ contain state management for user
 - helper:/ this folder have fetch frontend api.
 - tests:/ there three different test, for each page and api.

 ## package and dependencies
 - **dotenv**: Load environment variables from a .env file.
 - **vite:** react build on vite for handling bundling 

 ## Dev Dependencies
- nodemon: Tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected
  