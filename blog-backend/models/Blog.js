const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  type: String,
  url: String,
});

const blogPostSchema = new Schema({
  id: Number,
  title: String,
  content: String,
  city: String,
  country: String,
  media: [mediaSchema], // Array of media objects
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
