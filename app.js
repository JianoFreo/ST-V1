import express from 'express';
import { PORT } from './config/env.js'

const app = express();

// this is our first route
app.get('/', (req, res) =>{ 
    res.send('welcome to the subscription tracker API!');
});

// we have to make our server listen for req trying to access specific routes
//starts the server
app.listen(PORT, /*hostname,*/ /*callback function*/() => {
    console.log(`subscription tracker API is running on port http://localhost:${PORT}`);
});

export default app;
// then run on terminal 'npm run dev'
// “Export this app so other files can import and use it.”
// “This Express app I created? Make it available outside this file.”

//In another file, you can do:
// import app from './app.js';