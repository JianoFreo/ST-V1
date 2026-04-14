import arcjet, {shield, detectBot, tokenBucket} from "@arcjet/node";
import {ARCJET_KEY} from "./env.js";


const aj = arcjet({
    key: ARCJET_KEY, // Get your site key from https://app.arcjet.com
    // Track budgets per user — replace "userId" with any stable identifier
    characteristics: ["ip.src"],
    rules: [
        // Shield protects against common web attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Block all automated clients — bots inflate AI costs



///---Bot detection won't work on postman, insomnia, or any api testing tools because they are not browsers, they are not real users, they are bots, so if you try to test this middleware on postman or insomnia
// you will always get the "bot detected" response, because postman and insomnia are bots, they are not real users, they are not browsers, they are bots.
// bot detection may also not be used for mobile apps, because mobile apps are also not browsers, they are not real users, they are bots, so if you try to test this middleware on a mobile app
//For non-browser apps, common setup is:

// Keep shield and tokenBucket if you want protection.
// Disable or loosen detectBot for API routes used by your app.
// Keep shield and tokenBucket if you want protection.
// Disable or loosen detectBot for API routes used by your app.
// Use auth tokens / API keys / user session checks for app security instead of relying on bot detection.
// In short: if you are building an app that is not a browser, 
// you usually should not use strict bot blocking on the API endpoints your app calls.

//----Optional: Loosen Instead of Disable : If you must support mixed clients:-----------
// But this weakens protection
// "CATEGORY:PROGRAMMATIC" includes:
// API clients (Postman, mobile apps) 
// Scripts (curl, axios, Python requests) 
// Automation tools 
// Scrapers 
// Attack scripts 

// You are still getting bot detected on POSTMAN because 
// CATEGORY:PROGRAMMATIC is not a guaranteed 
// “allow all API clients” switch.

//If you need strict bot blocking later,
//  apply detectBot only to browser-facing routes, 
// not your API endpoints.

//  The problem:
// Malicious bots ALSO look like “programmatic clients.”

    // detectBot({
    // mode: "LIVE",
    // allow: [
    //     "CATEGORY:SEARCH_ENGINE",
    //     "CATEGORY:PROGRAMMATIC" // allow API clients
    // ],
    // }),



        // detectBot({
        //     mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
        //     allow: /* The `["CATEGORY:SEARCH_ENGINE"]` in the `detectBot` configuration is specifying a
        //     category of bots that are allowed to access the application. In this case, it
        //     allows bots categorized as search engine bots to access the application while
        //     blocking all other bots. */
        //     ["CATEGORY:SEARCH_ENGINE"], // Block all bots. See https://arcjet.com/bot-list
        // }),




        // Enforce budgets to control AI costs. Adjust rates and limits as needed.
        tokenBucket({ // rate limit to control costs
            // This algorithm is based on a bucket filled with a specific number
            // of tokens. Each request withdraws a token from the bucket and
            // the bucket is refilled at a fixed rate. Once the bucket is empty,
            // the client is blocked until the bucket refills.

            // This algorithm is useful when you want to allow clients to make a
            // burst of requestis and then still be able to make requests at a
            // slower rate.
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            refillRate: 10, // Refill 10 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 20, // Maximum 20 tokens in the bucket
        }),
    ],
});

export default aj;