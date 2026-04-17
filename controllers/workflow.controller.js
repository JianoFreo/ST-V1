import dayjs from 'dayjs';
import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send.email.js';

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
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }
        if (dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
        }
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Server workflow: sleeping until ${label} at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`triggering ${label} reminder`);
        await sendReminderEmail({
            to: subscription.user.email,
            type: label, subscription,
        })
    })
}