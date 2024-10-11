const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Get all blog posts by geo-location
router.get('/:geoLocation', async (req, res) => {
  try {
    const posts = await Blog.find({ geoLocation: req.params.geoLocation });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts" });
  }
});

// Add a new blog post
router.post('/', async (req, res) => {
  const { title, content, geoLocation } = req.body;
  const newPost = new Blog({ title, content, geoLocation });
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Error saving post" });
  }
});

module.exports = router;
