const User = require('./user');
const BlogPost = require('./Blog'); 

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


