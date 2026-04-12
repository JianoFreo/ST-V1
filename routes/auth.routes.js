// what is router? -> a way to organize routes in an Express.js application. It allows you to define routes in separate files and then use them in your main application file. This helps keep your code organized and modular, especially as your application grows in size and complexity. In this case, we are creating a router for authentication-related routes (sign-up, sign-in, sign-out) and then exporting it to be used in the main application file.
import { Router } from 'express';

import { signUp, signIn, signOut } from '../controllers/auth.controller.js';

const authRouter = Router( );
//Path: /api/v1/auth/sign-up (POST) -> signUp controller
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

// authRouter.post('/sign-up', (req,res) => res.send({title:'sign-up'}));
// authRouter.post('/sign-in', (req,res) => res.send({title:'sign-in'}));
// authRouter.post('/sign-out', (req,res) => res.send({title:'sign-out'}));

export default authRouter;