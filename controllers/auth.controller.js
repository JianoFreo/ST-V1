import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.model.js"
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
// what is a req body? -> the data sent by the client to the server in an HTTP request, typically used to submit form data or JSON payloads. It is accessed on the server side through the `req.body` property in Express.js, allowing the server to process and respond to the client's request based on the provided data.
// req.body is an object containing data from the client (POST request) 
export const signUp = async (req, res, next) => {

//req → incoming request
// res → response you send back
// next → “go to the next function in the chain”


    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // logic -> create user
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error('User already exists with this email');
            error.statusCode = 409; // 409 means conflict, which is appropriate for duplicate entries
            throw error;
        }

        // if it doesn't exist, create a new user
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        /* `const newUsers = await User.create([{ name, email, password: hashedPassword }], { session
        });` is creating a new user in the database using the Mongoose model `User`. It takes an
        array of objects containing the user's `name`, `email`, and `password` (hashed using bcrypt)
        as properties. The `{ session }` parameter ensures that the creation of the new user is part
        of the current session transaction, allowing for atomicity and consistency in database
        operations. */
        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

        /* `const token = jwt.sign({ userId: newUsers[0]._id }, process.env.JWT_SECRET, { expiresIn:
        process.env.JWT_EXPIRES_IN });` is generating a JSON Web Token (JWT) for the newly created
        user. */
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ // 201 means created, which is appropriate for successful resource creation
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUsers[0],
            }
        }); 
        /* `await session.commitTransaction();` is a statement that commits the current transaction
        within the session. This means that any changes made within the transaction will be saved and
        finalized in the database. If the commit is successful, the changes will be persisted, and
        the transaction will be completed. */
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('user not found');
            error.statusCode = 401; // 401 means unauthorized, which is appropriate for authentication failures
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401; // 401 means unauthorized, which is appropriate for authentication failures
            throw error;
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({ // 200 means OK, which is appropriate for successful requests
            success: true,
            message: 'User signed in successfully', 
            data: {
                token,
                user, //User (uppercase) in import User ... is the Mongoose model/class name, so PascalCase is standard.
//user (lowercase) in response JSON is just a data field/variable, so lowercase camelCase is standard.
            }
        });
    } catch (error) {
        next(error);
    } 
};

export const signOut = (req, res) => { }