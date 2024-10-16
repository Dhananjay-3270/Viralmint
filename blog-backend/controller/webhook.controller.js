const User = require('../models/user'); // Adjust the path based on your project structure
const BlogPost = require('../models/Blog'); // Adjust the path based on your project structure
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Stripe = require('stripe');
// const stripeWebhook = async (req, res) => {

//     const sig = req.headers['stripe-signature'];
//     let event;

//     try {
//         event = Stripe.webhooks.constructEvent(
//             req.body, // Stripe requires raw body for webhook verification
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (err) {
//         console.error('Webhook signature verification failed.', err);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the checkout.session.completed event
//     if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         console.log('Payment was successful:', session);
//         // Extract userId and blogData from metadata
//         // const userId = session.metadata.userId;
//         // const blogData = JSON.parse(session.metadata.blogData);

//         // try {
//         //     // Call the function to add the blog post to the user
//         //     const newBlog = await addBlogToUser(userId, blogData);

//         //     // Optionally, log the result or take further actions
//         //     console.log('Blog post created successfully:', newBlog);
//         // } catch (error) {
//         //     console.error('Error adding blog post:', error.message);
//         // }
//     }

//     res.status(200).end();
// };

const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Use req.body as the raw body here (it will be in Buffer format)
        event = Stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('Payment was successful:', session);
    }

    // Send a 200 response to Stripe to acknowledge receipt of the webhook
    res.status(200).send('Webhook received');
};

module.exports ={stripeWebhook}