import User from '../models/user.model.js';

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        next(error);
    }
};
export const getUser = async (req, res, next) => {
    try {
        /* `req.params.id` is accessing the value of the `id`
        parameter in the request URL. In this context, it is used
        to retrieve the specific user ID from the request
        parameters in order to find and retrieve the corresponding
        user document from the database using `User.findById()`. */


        // req = the request from the user
        // params = values taken from the URL
        // id = the specific value in the URL

        // when this runs -> User.findById(req.params.id)
        //it becomes -> User.findById('the value of id in the URL')


        const user = await User.findById(req.params.id).select('-password'); // Exclude the password field from the retrieved user document
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
};