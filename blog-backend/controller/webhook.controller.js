const User = require('../models/user'); // Adjust paths accordingly
const BlogPost = require('../models/Blog');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.Secret_key); // Initialize Stripe with secret key
const addBlogToUser =  require('./api.controller')
// Webhook handler for Stripe events
const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verify the webhook signature using raw body
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('⚠️  Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle specific Stripe event types (e.g., checkout.session.completed)
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('✅ Payment was successful:', session);

        // You can extract metadata or process the session object as needed
        const userId = session.metadata.userId;
        const blogData = JSON.parse(session.metadata.blogData);

        
        // Example: Add blog to the user (Uncomment and adjust logic as needed)
        try {
            const newBlog = await addBlogToUser(userId, blogData);
            console.log('Blog post created successfully:', newBlog);
        } catch (error) {
            console.error('Error adding blog post:', error.message);
        }
    }

    // Acknowledge receipt of the webhook event to Stripe
    res.status(200).send('Webhook received');
};

module.exports = { stripeWebhook };
