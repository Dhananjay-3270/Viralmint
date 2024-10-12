// routes/blogRoutes.js
const express = require('express');
const BlogPost = require('../models/Blog'); // Adjust path if necessary
const router = express.Router();

// Route to get blogs by city
router.get('/city/:city', async (req, res) => {
  try {
    const city = req.params.city;
    console.log(city);
    const blogs = await BlogPost.find({ city: city });

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blog posts found for this city.' });
    }

    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
