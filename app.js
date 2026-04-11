import express from 'express';
import { PORT } from './config/env.js'
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.route.js';
import connectToDatabase from './database/mongodb.js'

const app = express();

// middlewares

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

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