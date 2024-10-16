const User = require('../models/user'); // Adjust paths accordingly
const BlogPost = require('../models/Blog');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.Secret_key); // Initialize Stripe with secret key


const addBlogToUser = async (userId, blogData) => {
    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Create a new blog post with the provided data
        const newBlogPost = new BlogPost({
            title: blogData.title,
            content: blogData.content,
            city: blogData.city,
            country: blogData.country,
            media: blogData.media, // Include the media array
        });

        // Save the new blog post

        const savedBlogPost = await newBlogPost.save();

        // Push the new blog post ID into the user's blogs array
        user.blogs.push(savedBlogPost._id);

        // Save the updated user data
        await user.save();

        console.log('Blog added to user successfully:', savedBlogPost);
        return savedBlogPost; // Return the saved blog post if needed
    } catch (error) {
        console.error('Error adding blog to user:', error.message);
        throw error; // Rethrow the error for handling in calling code if needed
    }
};
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
            console.log('Blog post created successfully:', );
            res.status(200).send(newBlog);
        } catch (error) {
            console.error('Error adding blog post:', error.message);
            res.status(400).send({ error: error.message || 'Error creating blog post' });
        }
    }

    // Acknowledge receipt of the webhook event to Stripe
   
};

module.exports = { stripeWebhook };
