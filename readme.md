# SET-UP

no view becasue we are not focusing on the frontend

express-generator is a tool that helps you quickly create an Express.js application with a predefined structure and boilerplate code. It allows you to set up a new Express project with just a few commands, saving you time and effort in configuring the initial setup of your application.
```
npx express-generator --no-view --git ./
```
---
Install dependencies:
```
npm install dotenv
```
Install dotenv as soon as your code starts importing it, and before you run the app.

Practical order:

Install all dependencies right after creating or pulling the project: npm install
If dotenv is not already listed, add it: npm install dotenv
Then run your dev server: npm run dev
So in your case, do it right before running npm run dev, once you have the env.js import in place.



---
Install nodemon:

nodemon is a development tool that automatically restarts your Node.js application whenever it detects changes in the source code. It helps improve the development workflow by eliminating the need to manually stop and restart the server every time you make edits to your code. With nodemon, you can focus on writing code without worrying about restarting the server, as it will handle that for you.

What are the node modules? The node_modules directory is a folder in a Node.js project that contains all the installed dependencies and packages required for the project to run. When you install a package using npm (Node Package Manager), it is downloaded and stored in the node_modules directory. This directory can contain a large number of files and subdirectories, as it includes all the dependencies and their own dependencies. It is important to note that the node_modules directory should not be committed to version control systems like Git, as it can be easily recreated by running npm install based on the package.json file, which lists the project's dependencies.
then delete the bin, public, and routes

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
install mongodb and mongoose to connect to the database and perform operations on it. MongoDB is a popular NoSQL database that stores data in a flexible, JSON-like format, while Mongoose is an Object Data Modeling (ODM) library for MongoDB that provides a higher-level abstraction for working with the database. By installing these dependencies, you can easily interact with your MongoDB database using Mongoose's powerful features and methods.
```bash
npm install mongodb mongoose
```
Add a linter to install the dependencies. it would add eslint.config.js

linter is a tool that analyzes your code for potential errors, coding style issues, and other problems. It helps improve code quality and maintainability by enforcing consistent coding standards and identifying potential bugs or issues in your codebase. By using a linter, you can catch errors early in the development process and ensure that your code adheres to best practices.
```bash
npx eslint --init
```

what is eslint.config.js? ESLint is a popular JavaScript linter that helps identify and fix problems in your code. The eslint.config.js file is a configuration file for ESLint, where you can specify rules, settings, and plugins to customize how ESLint analyzes your code. This file allows you to define the coding standards and conventions you want to enforce in your project, making it easier to maintain consistent code quality across your codebase.

√ What do you want to lint? · javascript

√ How would you like to use ESLint? · problems

√ What type of modules does your project use? · esm

√ Which framework does your project use? · none

√ Does your project use TypeScript? · No / Yes

√ Where does your code run? · node     

---
Authentication

bcryptjs is a library that provides a way to hash and verify passwords securely. It uses the bcrypt algorithm, which is designed to be computationally expensive, making it resistant to brute-force attacks. By using bcryptjs, you can safely store user passwords in your database by hashing them before saving, and later verify the passwords during login by comparing the hashed version with the user input.

What is JWT? JWT stands for JSON Web Token, which is a compact and self-contained way to securely transmit information between parties as a JSON object. It is commonly used for authentication and authorization purposes in web applications. A JWT consists of three parts: a header, a payload, and a signature. The header typically contains information about the type of token and the signing algorithm used. The payload contains the claims or data that you want to transmit, such as user information or permissions. The signature is created by signing the header and payload with a secret key, ensuring the integrity and authenticity of the token. JWTs are often used in stateless authentication systems, where the server does not need to store session information, as all the necessary information is contained within the token itself.

```bash
npm install jsonwebtoken bcryptjs
```