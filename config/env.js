import { config } from 'dotenv';
// where is the dotenv file located? in the root of the project, but we have different env files for different environments, so we need to specify the path to the env file based on the current environment
//where is root? the root is the folder where the package.json file is located, so we can use the path module to get the root path and then specify the path to the env file based on the current environment



/* This line of code is using the `config` function from the `dotenv` package to load environment
variables from a specific `.env` file based on the current `NODE_ENV` environment variable. */
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
// this path is for local and and development


export const {
    PORT,
    NODE_ENV, 
    SERVER_URL,
    DB_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_TOKEN,
    QSTASH_URL,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
    EMAIL_PASSWORD
} = process.env; // switch between dev and prod without overriding one another

// what is process .env? it is an object that contains all the environment variables that are defined in the .env file, and it is also available globally in the Node.js environment, so we can access it from anywhere in our code.





