import  { Router } from 'express'
import { getUser, getUsers} from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

//static prameter
//GET /users -> get all the users

//Dynamic parameters 
//GET /users/:id -> get  user by id // 123 -> 123


userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE  user by ID'}));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE user'}));


export default userRouter