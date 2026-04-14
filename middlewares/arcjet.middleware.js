import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested : 1 }); // "Protect this request and tell your decision, is it a bot or not? 
// requested: 1 means we are requesting a decision for this request, we want to know if this request is a bot or not, 
// we want to know if we should allow this request to pass through or not.
//  We are asking Arcjet to analyze this request and give us a decision on whether to allow it or deny it.
//It also means we are taking 1 token from the bucket
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: 'Rate limit exceeded' });
            //detect bot wont work on postman, insomnia, or any api testing tools because they are not browsers, they are not real users, they are bots, so if you try to test this middleware on postman or insomnia
            // you will always get the "bot detected" response, because postman and insomnia are bots, they are not real users, they are not browsers, they are bots.
            // if (decision.reason.isBot()) return res.status(403).json({ error: 'bot detected' });
            return res.status(403).json({ error: 'Access denied' });
        }
        next(); // if the request is allowed, proceed to the next middleware or route handler
        // means we are not denying the process to pass through, we are allowing it to pass through
    }
    catch (error) {
        console.log("Arcjet Middleware Error: ", error);
        next(error);
    }
};

export default arcjetMiddleware;
