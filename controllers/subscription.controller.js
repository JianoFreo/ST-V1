import Subscription from "../models/subscription.model.js";

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        if (!subscriptions) {
            const error = new Error('No subscriptions');
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        /* The condition `req.user.id !== req.params.id` is checking if the user ID stored in the
        request object (`req.user.id`) is not equal to the user ID provided in the request
        parameters (`req.params.id`). */

        // what is req.params.id? -> it is the id of the user that we want to get the subscriptions for, which is passed in the URL as a parameter. For example, if the URL is /subscriptions/user/123, then req.params.id would be 123.
        //what is req.user.id? -> it is the id of the user that is making the request, which is stored in the request object by the authorize middleware after verifying the JWT token. 
        // This is the id of the authenticated user who is trying to access their subscriptions.


        // req.user.id != req.params.id -> this is checking if the user making the request is the same as the user whose subscriptions we want to get. If they are not the same, 
        // then we throw an error saying "you are not the owner of this account". This is a security measure to prevent users from accessing other users' subscriptions.
        if (req.user.id !== req.params.id) {
            const error = new Error('you are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const subscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        next(error);
    }
};


export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        res.status(201).json({ success: true, data: subscription });
    }
    catch (error) {
        next(error);
    }
}

// what is req.body? -> it is the data that is sent in the request body when creating a new subscription. It contains the details of the subscription such as 
// name, price, frequency, etc. The `...req.body` syntax is using the spread operator to copy all the properties from req.body into the new subscription object that we are creating. This allows us to easily create a new subscription with all the details provided in the request body, while also associating it with the authenticated user by setting the user field to req.user._id.
export const updateSubscription = async (req, res, next) => {
    try {
        /* In the `updateSubscription`
        function,
        `Subscription.findByIdAndUpdate(req.params.id,
        req.body, { new: true })` is a
        MongoDB method used to find a
        subscription by its ID (provided in
        `req.params.id`) and update it with
        the data in `req.body`. */
        const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (req.user.id !== req.params.id) {
            const error = new Error('you are not the owner of this account');
            error.status = 401;
            throw error;
        }
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

