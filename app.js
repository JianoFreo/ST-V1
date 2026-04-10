import express from 'express';

const app = express();

// this is our first route
app.get('/', (req, res) =>{ 
    res.send('welcome to the subscription treaccker API!');
});

// we have to make our server listen for req trying to access specific routes
app.listen(/*port*/ 3000, /*hostname*/() => {
    console.log('subscription tracker API is running on port http://localhost:3000');
})

export default app