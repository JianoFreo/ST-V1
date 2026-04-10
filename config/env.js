import {config} from 'dotenv';
/* This line of code is using the `config` function from the `dotenv` package to load environment
variables from a specific `.env` file based on the current `NODE_ENV` environment variable. */
config({path:`.env.${process.env.NODE_ENV || 'development'}.local`}); 
// this path is for local and and development


export const {PORT, NODE_ENV} = process.env; // switch between dev and prod without overriding one another





