import mongoose from 'mongoose';

/* This code snippet is defining a Mongoose schema for a user in a MongoDB database. It specifies the
structure of the user document with two fields: `name` and `email`. Each field has specific
properties defined: */
const subscriptionSchema = new mongoose.Schema({
    // call the Schema constructor
    // create a fresh schema object
    // store that object in userSchema
    // So here it is not “new” in the everyday sense; 
    // it is telling JavaScript to build a new Mongoose Schema 
    // instance from the definition inside the braces.
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0'],
        max: [1000, 'Price must be less than 1000'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true,

    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        /* The `validate` property in the Mongoose schema is used to define custom validation logic for
        a specific field. In this case, the `startDate` field is being validated to ensure that its
        value is in the past. */
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',

        }
    },

    renewalDate: {
        type: Date,
        /* The `validate` property in the Mongoose schema is used to define custom validation logic for
        a specific field. In this case, the `renewalDate` field is being validated to ensure that its
        value is after the `startDate` value. */
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date',
        }
    },
    /* The `user` field in the Mongoose schema is defining a reference to another document in the
    MongoDB database. Here's what each property in that field is doing: */
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }
/* The `}, { timestamps: true });` part in the Mongoose schema definition is setting the `timestamps`
option to `true`. This option automatically adds `createdAt` and `updatedAt` fields to the documents
in the collection. */}, { timestamps: true });


//Auto-calculate renewal date if missing
/* The `'save'` in the Mongoose schema is a middleware function that gets
executed before a document is saved to the database. In this specific case,
the `subscriptionSchema.pre('save', function (next) { ... })` middleware is
being used to perform some logic before saving a subscription document. */
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,

        };
        // Example
        // Jan 1st
        // 30 days
        // Jan 31st
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next(); //Proceed with the creation of the document or the schema in the database
})




/* `const User = mongoose.model('User', userSchema);` is creating a Mongoose model named 'User' based
on the userSchema that was defined earlier. This model will allow you to interact with the 'User'
collection in the MongoDB database. By defining a model, you can perform operations such as
creating, reading, updating, and deleting user documents in the database using Mongoose methods. */
const Subscription = mongoose.model('Subscription', userSchema);

export default Subscription;