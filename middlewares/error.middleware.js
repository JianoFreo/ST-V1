// create a subscription -> middleware (check for renewal date) -> middleware (check for errors) -> next -> controllers
// Basically middlewares are functions before executing the controller (actual logic)
// some blocks of codes that are executed before and after somthing allowing to interceptnwhat  is happening
const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;

        console.error(err);

        // Mongoose bad ObjectId
       /* This block of code is checking if the error object has a name property equal to 'CastError'.
       If it does, it sets a custom error message 'Resource not found', creates a new Error object
       with this message, and sets the status code to 404 (Not Found). This is typically used to
       handle errors related to casting issues, such as when trying to convert an invalid value to a
       specific data type in a database query. */
        if (err.name = 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }
        // Mongoose duplicate key
        /* This block of code is checking if the error object has a code property equal to 11000. If it
        does, it sets a custom error message 'Duplicate field value entered', creates a new Error
        object with this message, and sets the status code to 400 (Bad Request). This is typically
        used to handle errors related to duplicate key constraints in a database, where a field
        value that should be unique is being entered again. */
        if (err.code = 11000) {
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }
        // Mongoose validation error
       /* This block of code is checking if the error object has a name property equal to
       'ValidationError'. If it does, it extracts the error messages from the `err.errors` object
       using `Object.values(err.errors)` to get an array of error objects, then maps over these
       error objects to extract the `message` property from each one using `val.message`. */
        if (err.name = 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
        
/* This line of code is setting the HTTP status code of the response to the `error.statusCode` if it
exists, or to a default value of 500 (Internal Server Error) if `error.statusCode` is not defined.
It then sends a JSON response back to the client with the following structure: */
        res.status(error.statusCode || 500).json({success: false, error:error.messsage || 'Server Error'});
    } catch (error) {
        next(error);
    }
};


export default errorMiddleware; // Then Use it within the app.js