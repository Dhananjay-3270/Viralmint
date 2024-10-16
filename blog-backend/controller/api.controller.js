const User = require('../models/user'); // Adjust the path based on your project structure
const BlogPost = require('../models/Blog'); // Adjust the path based on your project structure
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Stripe = require('stripe');
// Function to create a user and assign a basic blog post
// const createUserWithBasicBlog = async (username, email, password, city, country) => {
//     try {
//         // Create a basic blog post data
//         const blogData = {
//             id: 1, // You might want to generate a unique ID if needed
//             title: "My First Blog Post",
//             content: "This is the content of my first blog post.",
//             city: city,
//             country: country,
//             media: [{ type: "image", url: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg" },
//             {
//                 type: "video",
//                 url: "https://videos.pexels.com/video-files/1851768/1851768-uhd_2560_1440_30fps.mp4"
//             }
//             ],
//         };

//         // Create and save the new blog post

//         const newBlogPost = new BlogPost(blogData);
//         const savedBlogPost = await newBlogPost.save(); // Save the blog post

//         // Create a new user with the saved blog post's ID
//         const user = new User({
//             username,
//             email,
//             password,
//             location: { city, country }, // Add location details
//             blogs: [savedBlogPost._id], // Associate the saved blog post with the user
//         });

//         await user.save();
//         return user; // Return the created user for further use
//     } catch (error) {
//         throw new Error('Error creating user: ' + error.message); // Throw the error for handling in the controller
//     }
// };

const createUserWithBasicBlog = async (username, email, password, city, country) => {
    try {
        // Check if the user already exists by username or email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            // If user already exists, return a response indicating the user exists
            return {
                message: 'User already exists',
                user: existingUser, // Optionally return the existing user details
            };
        }

        // Create a basic blog post data if user does not exist
        const blogData = {
            id: 1, // You might want to generate a unique ID if needed
            title: "My First Blog Post",
            content: "This is the content of my first blog post.",
            city: city,
            country: country,
            media: [
                { type: "image", url: "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg" },
                {
                    type: "video",
                    url: "https://videos.pexels.com/video-files/1851768/1851768-uhd_2560_1440_30fps.mp4"
                }
            ],
        };

        // Create and save the new blog post
        const newBlogPost = new BlogPost(blogData);
        const savedBlogPost = await newBlogPost.save(); // Save the blog post

        // Create a new user with the saved blog post's ID
        const user = new User({
            username,
            email,
            password,
            location: { city, country }, // Add location details
            blogs: [savedBlogPost._id], // Associate the saved blog post with the user
        });

        await user.save();
        return {
            message: 'User created successfully',
            user, // Return the newly created user for further use
        };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message); // Throw the error for handling in the controller
    }
};




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
// Register User Controller
const registeruser = async (req, res) => {
    const { username, email, password, city, country } = req.body;

    try {
        // Call the function to create the user with a basic blog
        const newUser = await createUserWithBasicBlog(username, email, password, city, country);

        // Respond with the newly created user's data
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: error.message });
    }
};

const loginuser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email and password
        const user = await User.findByCredentials(email, password);

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload (user information to include in the token)
            process.env.JWT_SECRET, // Your secret key stored in environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        // Simulate sending back the user data and token after successful login
        res.status(200).json({
            message: 'Login successful',
            token, // Include the token in the response
            user: {
                username: user.username,
                email: user.email,
                location: user.location,
                blogs: user.blogs,
            },
        });
    } catch (error) {
        // Handle any errors that occur (e.g., invalid credentials)
        res.status(401).json({ message: error.message });
    }
}
const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('blogs'); // Populate blogs if needed
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            location: user.location,
            blogs: user.blogs,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const addblog = async (req, res) => {

    const blog = req.body;
    const userId = req.userId; // Extract the user ID from the request
    console.log("Blog data from client", blog)
    try {
        // Call the function to add the blog post to the user
        const newBlog = await addBlogToUser(userId, blog);
        // Respond with the newly created blog post
        res.status(201).send(newBlog);
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(400).send({ error: error.message || 'Error creating blog post' });
    }
};



const deleteblog = async (req, res) => {
    const blogId = req.params.id;

    try {
        const user = await User.findById(req.userId).populate('blogs');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the blog exists in the user's blogs
        const blogIndex = user.blogs.findIndex(blog => blog._id.toString() === blogId);
        if (blogIndex === -1) {
            return res.status(403).json({ message: 'Unauthorized to delete this blog' });
        }

        console.log(user.blogs)
        console.log(user.blogs[0])
        user.blogs.splice(blogIndex, 1);
        await user.save(); // Save the user to persist changes

        // Delete the blog post from the BlogPost collection
        await BlogPost.findByIdAndDelete(blogId); // Use BlogPost here
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


const editblog = async (req, res) => {

    const blogId = req.params.id;
    const blogData = req.body;


    try {
        const user = await User.findById(req.userId).populate('blogs');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the blog exists in the user's blogs
        const blogIndex = user.blogs.findIndex(blog => blog._id.toString() === blogId);
        if (blogIndex === -1) {
            return res.status(403).json({ message: 'Unauthorized to update this blog' });
        }

        // Find the blog post to update
        const blogPost = await BlogPost.findById(blogId);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found.' });
        }

        // Update the blog post with the provided blogData
        blogPost.title = blogData.title || blogPost.title; // Update title if provided
        blogPost.content = blogData.content || blogPost.content; // Update content if provided
        blogPost.city = blogData.city || blogPost.city; // Update city if provided
        blogPost.country = blogData.country || blogPost.country; // Update country if provided
        blogPost.media = blogData.media || blogPost.media; // Update media if provided

        // Save the updated blog post
        await blogPost.save();

        // If you need to also update the user's blogs array, you could do:
        user.blogs[blogIndex] = blogPost._id; // Optional: If you want to keep the reference updated in the user document
        await user.save(); // Save user if you made changes to its blogs array

        res.status(200).json({ message: 'Blog updated successfully', blog: blogPost });
    } catch (error) {
        console.error('Error updating blog:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating blog: ' + error.message }); // Handle errors
    }



}
const checkout = async (req, res) => {

    const blogData = req.body;
    const userId = req.userId;  // Assuming userId is extracted from the request, similar to addblog
    const stripe = new Stripe(process.env.Secret_key);

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Blog Publishing: ${blogData.title}`, // Name of the blog
                        },
                        unit_amount: 300000, // Set amount in cents (3000 = 30 INR)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:5173/creatorsection/checkout/succes',
            cancel_url: 'http://localhost:5173/creatorsection/checkout/failure',
            metadata: {
                userId,  // Storing user ID and blog data in Stripe session metadata
                blogData: JSON.stringify(blogData),
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).send('Server error creating Stripe session');
    }
}








module.exports = { registeruser, loginuser, getUserData, addblog, deleteblog, editblog, checkout, addBlogToUser };
