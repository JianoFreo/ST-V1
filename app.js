import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.route.js';
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js';


const app = express();

// this is where we use the routers we created in the routes folder.
//Built in middlewares
// Built in middlewares
app.use(express.json()); // to parse incoming JSON data in the request body
app.use(express.urlencoded({ extended: false})); // to parse URL-encoded data (like form submissions) in the request body
app.use(cookieParser()); // to parse cookies from the incoming requests, 
// making them available in req.cookies for easy access and manipulation. 
// Has to be imported first before using it as a middleware. 

// this is where we use the routers we created in the routes folder.
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use(errorMiddleware); // middlewares

// this is our first route
app.get('/', (req, res) => { 
    res.send('welcome to the subscription tracker API!');
});

// we have to make our server listen for req trying to access specific routes
//starts the server
app.listen(PORT, /*hostname,*/ /*callback function*/async () => {
    console.log(`subscription tracker API is running on port http://localhost:${PORT}`);
    await connectToDatabase()
});

export default app;
// then run on terminal 'npm run dev'
// “Export this app so other files can import and use it.”
// “This Express app I created? Make it available outside this file.”

//In another file, you can do:
// import app from './app.js';