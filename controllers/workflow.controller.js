import dayjs from 'dayjs';
import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';

const REMINDERS = [7, 5, 2, 1];

const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
// we need to use require instead of import because 
// the @upstash/workflow/express package is not compatible with ES modules, 
// and it uses CommonJS syntax, which requires us to use require to import it.

export const sendReminders = serve(async (context) => {
    const { subscriptionID } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionID);

    if (!subscription || subscription.status !== 'active') return

    const renewalDate = dayjs(subscription.renewalDate);
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionID}, stopping workflow`);
        return;
    }
    for (const days of REMINDERS) {
        const reminderDate = renewalDate.subtract(days, 'day');
        //renwealDate - 7 days, renewalDate - 5 days, renewalDate - 2 days, renewalDate - 1 day
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${days} days before` , reminderDate)
        }
        await triggerReminder(context, `Reminder ${days} days before`);
    }
});


const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleep until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // send email, sms, push notification

    })
}