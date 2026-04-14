import { Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { 
    getAllSubscriptions,
    getUserSubscriptions, 
    createSubscription,
    subscriptionDetails,
    updateSubscription
 } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions ); // This route will return all subscriptions in the database, 
// but it is protected by the authorize middleware, so only authenticated users can access it. 
// You can modify the getAllSubscriptions controller function to return only the subscriptions that belong to the authenticated user if you want to restrict access further.

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions); // This route will return all subscriptions that belong to a specific user, identified by the :id parameter in the URL. 
// It is also protected by the authorize middleware, so only authenticated users can access it. 
// The getUserSubscriptions controller function will check if the authenticated user is the same as the user whose subscriptions are being requested, and if not, it will return an error.

subscriptionRouter.get('/:id', authorize, subscriptionDetails); // This route will return the details of a specific subscription, identified by the :id parameter in the URL. 
// It is also protected by the authorize middleware, so only authenticated users can access it. 
// The subscriptionDetails controller function will check if the authenticated user is the owner of the subscription, and if not, it will return an error.

subscriptionRouter.post('/', authorize, createSubscription); // This route will create a new subscription. It is protected by the authorize middleware, so only authenticated users can access it. 
// The createSubscription controller function will create a new subscription document in the database, and it will associate the subscription with the authenticated user by setting the user field to req.user._id.

subscriptionRouter.put('/:id', authorize, updateSubscription); // This route will update a specific subscription, 
// identified by the :id parameter in the URL. 
// it updates the subscription with the data provided in the request body.
subscriptionRouter.delete('/:id', authorize, (req, res) => res.send({ title: 'DELETE subscription' })); // This route will delete a specific subscription, identified by the :id parameter in the URL. 
// It is not protected by the authorize middleware, so anyone can access it. 
// and also add a check in the controller function to ensure that the authenticated user is the owner of the subscription before allowing them to delete it.

subscriptionRouter.put('/:id/cancel', authorize, (req, res) => res.send({ title: 'CANCEL subscription' })); // This route will cancel a specific subscription, identified by the :id parameter in the URL. 
// It is not protected by the authorize middleware, so anyone can access it. 
// You should consider adding the authorize middleware to this route to restrict access to authenticated users only, 
// and also add a check in the controller function to ensure that the authenticated user is the owner of the subscription before allowing them to cancel it.

subscriptionRouter.get('/upcoming-renewals', authorize, (req, res) => res.send({ title: 'GET upcoming renewals' })); // This route will return a list of subscriptions that are due for renewal in the next 7 days. 
// It is not protected by the authorize middleware, so anyone can access it. 
// You should consider adding the authorize middleware to this route to restrict access to authenticated users only, 
// and also modify the controller function to return only the subscriptions that belong to the authenticated user.

export default subscriptionRouter;