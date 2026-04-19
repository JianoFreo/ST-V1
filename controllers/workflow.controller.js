import dayjs from 'dayjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js'

const REMINDERS = [7, 5, 2, 1]

/* The `export const sendReminders` function is responsible for sending reminders to users based on
their subscription renewal dates. Here's a breakdown of what the function is doing: */
export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscription(context, subscriptionId);

  if(!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if(reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    if (dayjs().isSame(reminderDate, 'day')) {
      await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }
  }
});

/**
 * The function fetches a subscription by its ID and populates the user information associated with it.
 * @param context - Context typically refers to the execution context in which a function is called. In
 * this case, it seems like the `context` parameter is being used to provide a context for running a
 * specific operation related to fetching a subscription. This context might include information or
 * settings needed for the operation to be executed successfully.
 * @param subscriptionId - The `subscriptionId` parameter is the unique identifier of the subscription
 * that you want to fetch from the database. It is used to query the database for the specific
 * subscription record based on this identifier.
 * @returns The `fetchSubscription` function is returning a promise that resolves to the result of
 * finding a subscription by its ID and populating the 'user' field with the 'name' and 'email'
 * properties.
 */
const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  })
}
/**
 * The function `sleepUntilReminder` logs a message and then waits until a specified date for a
 * reminder.
 * @param context - The `context` parameter likely refers to the context or environment in which the
 * function is being executed. It may contain information or methods related to scheduling reminders or
 * handling time-related operations.
 * @param label - The `label` parameter is a string that represents the type or name of the reminder.
 * It is used to identify the specific reminder that the function is waiting for.
 * @param date - The `date` parameter is a moment object representing the date and time of the reminder
 * that the function `sleepUntilReminder` will wait for before continuing.
 */

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
}

/**
 * The function `triggerReminder` asynchronously triggers a reminder by sending an email to a user
 * based on the provided label and subscription information.
 * @param context - The `context` parameter is typically used to provide information about the current
 * execution context or environment. It can include data such as the current user, permissions,
 * settings, or any other relevant information needed for the function to operate correctly. In the
 * provided code snippet, the `context` parameter is likely being
 * @param label - The `label` parameter is a string that represents the type of reminder being
 * triggered. It is used to identify the specific reminder that needs to be sent.
 * @param subscription - The `subscription` parameter likely contains information about a user's
 * subscription, such as the user's email address, subscription type, and any other relevant details
 * related to the subscription service. This information is used to send a reminder email to the user
 * based on the specified label.
 * @returns The `triggerReminder` function is returning the result of the `context.run` function, which
 * is a Promise.
 */
const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    })
  })
}