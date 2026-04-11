import  { Router } from 'express'

const userRouter = Router();

//static prameter
//GET /users -> get all the users

//Dynamic parameters 
//GET /users/:id -> get  user by id // 123 -> 123


userRouter.get('/', (req, res) => res.send({title: 'GET all users'}));

userRouter.get('/:id', (req, res) => res.send({title: 'GET user details'}));

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE  user by ID'}));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE user'}));


export default userRouter