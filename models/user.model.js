import mongoose from 'mongoose';

/* This code snippet is defining a Mongoose schema for a user in a MongoDB database. It specifies the
structure of the user document with two fields: `name` and `email`. Each field has specific
properties defined: */
const userSchema = new mongoose.Schema({ 
// call the Schema constructor
// create a fresh schema object
// store that object in userSchema
// So here it is not “new” in the everyday sense; 
// it is telling JavaScript to build a new Mongoose Schema 
// instance from the definition inside the braces.
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 255,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'], //it means it should be (string + @ + string + . + string)
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
    }
/* The `}, { timestamps: true });` part in the Mongoose schema definition is setting the `timestamps`
option to `true`. This option automatically adds `createdAt` and `updatedAt` fields to the documents
in the collection. */}, { timestamps: true });

/* `const User = mongoose.model('User', userSchema);` is creating a Mongoose model named 'User' based
on the userSchema that was defined earlier. This model will allow you to interact with the 'User'
collection in the MongoDB database. By defining a model, you can perform operations such as
creating, reading, updating, and deleting user documents in the database using Mongoose methods. */
const User = mongoose.model('User', userSchema);

export default User;