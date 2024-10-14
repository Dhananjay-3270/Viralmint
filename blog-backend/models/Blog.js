const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    type: { type: String, required: true },
    url: { type: String, required: true },
});

const blogPostSchema = new Schema({
  id: Number,
  title: { type: String, required: true },    // Title is required
  content: { type: String, required: true },  // Content is required
  city: { type: String, required: true },     // City is required
  country: { type: String, required: true },  // Country is required
  media: [mediaSchema], // Array of media objects
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
