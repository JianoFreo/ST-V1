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
---
```bash
npm i @arcjet/next
```
> FIRST have to create an account on arcjet and get the key and environment variables to add to the .env file

> Paste the key and environment variables in the .env file and then import them in the env.js file to use them in the arcjet.js file

> Create a new API route at /app/api/chat/route.ts: or just create it as a middleware and use it in the user.routes.js file

> grab the src from here: https://docs.arcjet.com/get-started?f=node-js-express or juust copy this source code and paste it:
```js
import { openai } from "@ai-sdk/openai";
import arcjet, {
  detectBot,
  detectPromptInjection,
  sensitiveInfo,
  shield,
  tokenBucket,
} from "@arcjet/next";
import type { UIMessage } from "ai";
import { convertToModelMessages, isTextUIPart, streamText } from "ai";

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  // Track budgets per user — replace "userId" with any stable identifier
  characteristics: ["userId"],
  rules: [
    // Shield protects against common web attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Block all automated clients — bots inflate AI costs
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      allow: [], // Block all bots. See https://arcjet.com/bot-list
    }),
    // Enforce budgets to control AI costs. Adjust rates and limits as needed.
    tokenBucket({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      refillRate: 2_000, // Refill 2,000 tokens per hour
      interval: "1h",
      capacity: 5_000, // Maximum 5,000 tokens in the bucket
    }),
    // Block messages containing sensitive information to prevent data leaks
    sensitiveInfo({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block PII types that should never appear in AI prompts.
      // Remove types your app legitimately handles (e.g. EMAIL for a support bot).
      deny: ["CREDIT_CARD_NUMBER", "EMAIL"],
    }),
    // Detect prompt injection attacks before they reach your AI model
    detectPromptInjection({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
    }),
  ],
});

export async function POST(req: Request) {
  // Replace with your session/auth lookup to get a stable user ID
  const userId = "user-123";
  const { messages }: { messages: UIMessage[] } = await req.json();
  const modelMessages = await convertToModelMessages(messages);

  // Estimate token cost: ~1 token per 4 characters of text (rough heuristic).
  // For accurate counts use https://www.npmjs.com/package/tiktoken
  const totalChars = modelMessages.reduce((sum, m) => {
    const content =
      typeof m.content === "string" ? m.content : JSON.stringify(m.content);
    return sum + content.length;
  }, 0);
  const estimate = Math.ceil(totalChars / 4);

  // Check the most recent user message for sensitive information and prompt injection.
  // Pass the full conversation if you want to scan all messages.
  const lastMessage: string = (messages.at(-1)?.parts ?? [])
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join(" ");

  // Check with Arcjet before calling the AI provider
  const decision = await aj.protect(req, {
    userId,
    requested: estimate,
    sensitiveInfoValue: lastMessage,
    detectPromptInjectionMessage: lastMessage,
  });

  if (decision.isDenied()) {
    if (decision.reason.isBot()) {
      return new Response("Automated clients are not permitted", {
        status: 403,
      });
    } else if (decision.reason.isRateLimit()) {
      return new Response("AI usage limit exceeded", { status: 429 });
    } else if (decision.reason.isSensitiveInfo()) {
      return new Response("Sensitive information detected", { status: 400 });
    } else if (decision.reason.isPromptInjection()) {
      return new Response(
        "Prompt injection detected — please rephrase your message",
        { status: 400 },
      );
    } else {
      return new Response("Forbidden", { status: 403 });
    }
  }

  const result = await streamText({
    model: openai("gpt-4o"),
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
```
what is arcjet? Arcjet is a security and bot management platform that provides tools and services to protect web applications from various types of attacks, including bots, malicious traffic, and other security threats. It offers features such as bot detection, rate limiting, and traffic analysis to help safeguard applications and ensure they are only accessed by legitimate users. By integrating Arcjet into your application, you can enhance its security and mitigate potential risks associated with automated traffic and malicious actors.

https://docs.arcjet.com/get-started?f=node-js-express
---
# Workflows
### Install upstash workflow
```bash
npm install @upstash/workflow
```
what is upstash workflow? Upstash Workflow is a serverless workflow orchestration service that allows you to design, execute, and manage complex workflows in a scalable and efficient manner. It provides a way to define a series of tasks or steps that can be executed in a specific order, with support for error handling, retries, and parallel execution. Upstash Workflow is built on top of the Upstash serverless database, which provides low-latency data storage and retrieval capabilities. By using Upstash Workflow, you can easily create and manage workflows for various use cases such as data processing, automation, and integration with other services.
---
## install day js for the date manipulation in the workflow
```bash
npm install dayjs
```
---
```bash
npx @upstash/qstash-cli dev
```
How to run qstash? To run QStash, you can use the command `npx @upstash/qstash-cli dev` in your terminal. This command starts the QStash development server, allowing you to test and develop your message queues and scheduled tasks locally. Make sure you have the necessary environment variables set up in your .env file for QStash to function properly. Once the server is running, you can enqueue messages and schedule tasks to be processed asynchronously by your workers.


what is qstash? QStash is a serverless message queue and scheduler service provided by Upstash. It allows you to enqueue and schedule tasks or messages to be processed asynchronously. With QStash, you can create queues to hold messages that need to be processed, and workers that consume those messages and perform the necessary actions. It supports features such as delayed messages, retries, and dead-letter queues for handling failed messages. QStash is designed to be scalable and efficient, making it suitable for various use cases such as background processing, task scheduling, and event-driven architectures.

put the qstash URL in the .env file and import it in the env.js file to use it in the workflow file

and put the old qstash keys to the production