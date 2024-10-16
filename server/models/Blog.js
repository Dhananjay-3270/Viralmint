// Importing the required modules from mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Shortcut to define Mongoose schema

// Define schema for media objects associated with blog posts
const mediaSchema = new Schema({
    type: { type: String, required: true }, // Type of media (e.g., image, video)
    url: { type: String, required: true },  // URL where the media is stored
});

// Define schema for a blog post
const blogPostSchema = new Schema({
  id: Number, // Blog post ID (optional, depending on the use case)
  title: { type: String, required: true },    // Blog post title (required)
  content: { type: String, required: true },  // Blog post content (required)
  city: { type: String, required: true },     // City where the blog post is related (required)
  country: { type: String, required: true },  // Country where the blog post is related (required)
  media: [mediaSchema], // Array of media objects (e.g., images, videos)
});

// Create and export a Mongoose model for blog posts
// 'BlogPost' will be the collection name in MongoDB
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
