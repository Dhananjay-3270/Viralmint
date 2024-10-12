const User = require('./models/User');
const BlogPost = require('./models/BlogPost'); // Import BlogPost model

const createUserWithBlog = async (username, email, password, city, country, blogData) => {
    try {
        // Create a new blog post
        const newBlogPost = new BlogPost(blogData);
        const savedBlogPost = await newBlogPost.save(); // Save the blog post

        // Create a new user
        const user = new User({
            username,
            email,
            password,
            location: { city, country }, // Add location details
            blogs: [savedBlogPost._id] // Associate the saved blog post
        });

        await user.save();
        console.log('User created successfully:', user);
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

// Example usage
const blogData = {
    id: 1,
    title: "My First Blog Post",
    content: "This is the content of my first blog post.",
    city: city,
    country: country,
    media: [{ type: "image", url: "http://example.com/image.jpg" }],
};

createUserWithBlog('john_doe', 'john@example.com', 'password123', 'Mumbai', 'India', blogData);
