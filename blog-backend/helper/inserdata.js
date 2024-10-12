// helper/insertData.js
const BlogPost = require('../models/Blog');
const data = require("../Data/data.json");

const insertData = async () => {
  try {
    const existingPosts = await BlogPost.find(); 
    if (existingPosts.length > 0) {
      console.log('Data already exists in the database. Skipping insertion.');
      return; 
    }

    await BlogPost.insertMany(data);
    console.log('Blog posts added successfully!');
  } catch (err) {
    console.error('Error inserting blog posts:', err);
  }
};

module.exports = insertData; // Ensure you're exporting the function correctly
