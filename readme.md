# SET-UP

no view becasue we are not focusing on the frontend

express-generator is a tool that helps you quickly create an Express.js application with a predefined structure and boilerplate code. It allows you to set up a new Express project with just a few commands, saving you time and effort in configuring the initial setup of your application.
```
npx express-generator --no-view --git ./
```
then delete the bin, public, and routes
---
Install nodemon:

nodemon is a development tool that automatically restarts your Node.js application whenever it detects changes in the source code. It helps improve the development workflow by eliminating the need to manually stop and restart the server every time you make edits to your code. With nodemon, you can focus on writing code without worrying about restarting the server, as it will handle that for you.
```
npm install --save-dev nodemon
```
it always synchronizes your server even after edits
---
Then edit the package.json with this:

```json
{
  "name": "subdub",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^17.4.1",
    "express": "~4.16.1",
    "morgan": "~1.9.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "eslint": "^10.2.0",
    "globals": "^17.4.0",
    "nodemon": "^3.1.14"
  }
}
```
---
Add a linter to install the dependencies. it would add eslint.config.js

linter is a tool that analyzes your code for potential errors, coding style issues, and other problems. It helps improve code quality and maintainability by enforcing consistent coding standards and identifying potential bugs or issues in your codebase. By using a linter, you can catch errors early in the development process and ensure that your code adheres to best practices.
```
npx eslint --init
```
√ What do you want to lint? · javascript

√ How would you like to use ESLint? · problems

√ What type of modules does your project use? · esm

√ Which framework does your project use? · none

√ Does your project use TypeScript? · No / Yes

√ Where does your code run? · node     

---
Authentication

bcryptjs is a library that provides a way to hash and verify passwords securely. It uses the bcrypt algorithm, which is designed to be computationally expensive, making it resistant to brute-force attacks. By using bcryptjs, you can safely store user passwords in your database by hashing them before saving, and later verify the passwords during login by comparing the hashed version with the user input.
```
npm install jsonwebtoken bcryptjs
```
