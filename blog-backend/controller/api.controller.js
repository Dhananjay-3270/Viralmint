const User = require('../models/user'); // Adjust the path based on your project structure
const BlogPost = require('../models/Blog'); // Adjust the path based on your project structure
const jwt = require('jsonwebtoken');
// Function to create a user and assign a basic blog post
const createUserWithBasicBlog = async (username, email, password, city, country) => {
    try {
        // Create a basic blog post data
        const blogData = {
            id: 1, // You might want to generate a unique ID if needed
            title: "My First Blog Post",
            content: "This is the content of my first blog post.",
            city: city,
            country: country,
            media: [{ type: "image", url: "http://example.com/image.jpg" },
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
        return user; // Return the created user for further use
    } catch (error) {
        throw new Error('Error creating user: ' + error.message); // Throw the error for handling in the controller
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

const addblogtouser = async (req, res) => {
    try {
        const newBlogPost = new BlogPost({
          ...req.body,
          user: req.user._id, // Associate the blog post with the logged-in user
        });
    
        await newBlogPost.save(); // Save blog post
    
        // Optionally, you can also push the blog post ID to the user's blogs array if required
        req.user.blogs.push(newBlogPost._id);
        await req.user.save();
    
        res.status(201).send(newBlogPost);
      } catch (error) {
        res.status(400).send({ error: 'Error creating blog post' });
      }


}


module.exports = { registeruser, loginuser, getUserData, addblogtouser };
