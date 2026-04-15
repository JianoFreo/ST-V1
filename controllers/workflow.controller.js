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
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);
    if (renewalDate.isBefore(dayjs())) {}
    
    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        //renwealDate - 7 days, renewalDate - 5 days, renewalDate - 2 days, renewalDate - 1 day
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }
        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});


const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Server workflow: sleeping until ${label} at ${date.toISOString()}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Server workflow: triggering ${label}`);
        // send email, sms, push notification

    })
}