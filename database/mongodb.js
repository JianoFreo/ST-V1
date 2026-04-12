// the database folder is for setting up the connection to the database and any database related utilities.
//  In this case, we are using MongoDB with Mongoose as the ODM (Object Data Modeling) library. 
// The code connects to the MongoDB database using the connection string provided in the environment variables and logs the connection status. 
// If there is an error during the connection, it logs the error and exits the process.




// the difference between the database folder and the models folder is that the database folder 
// is for setting up the connection to the database and any database related utilities, 
// while the models folder is for defining the data models (schemas) that represent the structure of the data in the database.


//what are schemas in mongoose?In Mongoose, a schema is a blueprint for defining the structure of documents within a MongoDB collection. 
// It allows you to specify the fields, their data types, 
// and any validation rules or default values for those fields. Schemas are used to create models, 
// which are then used to interact with the database. 
// A schema helps ensure that the data stored in the database adheres
//  to a specific format and can include features such as virtuals, middleware, and instance methods.




import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI) {
throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local')
}
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`connected to database in ${NODE_ENV} mode`);
        } catch (error) {
        console.error('Error connecting to database: ', error);

        process.exit(1);
        }
}
export default connectToDatabase;