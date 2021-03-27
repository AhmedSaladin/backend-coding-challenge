# backend-coding-challenge-solution
My solution to Gemography "backend-coding-challenge" as a hiring process and it about calling github search api to get trending repositories 
and most starred repos created in the last 30 days ( from now ) in descending  order.
## Functional specs
- Develop a REST microservice that list the languages used by the 100 trending public repos on GitHub.
- For every language, you need to calculate the attributes below:
    - Number of repos using this language.
    - The list of repos using the language.
## Requirements
- Node.js 14.13.1
- NPM 6.14.8
## How to start project
1. run ```npm install``` to install project dependencies.
2. run ```npm start``` to start project.
   - after run this command this message will apear in console ```Server is running on port:---```
     after port will appear default port number in your environment or 3000.
## API List
- ```localhost:port\``` display pure response from github in json format.
    - <img src="./src/home.PNG">
- ```localhost:port\languagelist``` display languages list and it formated as object for every language and contain {```name: language name ,
count: repos number, 
items: language repos```}
    - <img src="./src/languagelist.PNG">

