# SET-UP

no view becasue we are not focusing on the frontend
```
npx express-generator --no-view --git ./
```
then delete the bin, public, and routes
---
Install nodemon:
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
```
npm install jsonwebtoken bcrypt.js
```
