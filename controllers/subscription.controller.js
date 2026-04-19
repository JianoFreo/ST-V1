import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'
import { sendReminderEmail } from '../utils/send-email.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });


    try {
      await sendReminderEmail({
        to: req.user.email,
        type: 'subscription created',
        subscription: {
          ...subscription.toObject(),
          user: req.user,
        },
      });
    } catch (emailError) {
      console.log(emailError, 'Error sending subscription created email');
    }

/* This code snippet is making a request to trigger a workflow using the `workflowClient`. Here's a
breakdown of what it's doing: */
    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })

    res.status(201).json({
      success: true,
      data: { subscription, workflowRunId }
    });
  } catch (e) {
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if (req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}