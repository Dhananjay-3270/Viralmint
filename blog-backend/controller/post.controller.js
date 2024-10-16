const express = require('express');
const BlogPost = require('../models/Blog'); // Adjust path if necessary
const router = express.Router();


getallpost = async (req, res) => {

    try {
        const city = req.params.city;

        const blogs = await BlogPost.find({ city: city });

        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blog posts found for this city.' });
        }

        res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { getallpost }