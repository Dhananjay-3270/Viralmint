// Import required modules
const express = require('express');
const router = require("express").Router(); // Create a new router instance for handling routes
const authenticate = require("../middleware/auth"); // Middleware for user authentication
const { 
  registeruser, 
  loginuser, 
  getUserData, 
  addblog, 
  deleteblog, 
  editblog, 
  checkout, 
  stripeWebhook 
} = require("../controller/api.controller"); // Import controller functions

// User registration route
// Handles user registration
router.post("/register", registeruser);

// User login route
// Handles user login
router.post("/login", loginuser);

// Get user data route
// Protected route that fetches user information, requires authentication
router.get('/user', authenticate, getUserData);

// Add blog route
// Protected route to add a blog, requires authentication
router.post('/addblogs', authenticate, addblog);

// Delete blog route
// Protected route to delete a blog by its ID, requires authentication
router.delete("/delete/:id", authenticate, deleteblog);

// Edit blog route
// Protected route to edit a blog by its ID, requires authentication
router.post('/edit/:id', authenticate, editblog);

// Checkout session creation route
// Protected route to create a Stripe checkout session, requires authentication
router.post("/create-checkout-session", authenticate, checkout);

// Stripe webhook route
// Receives webhook events from Stripe for handling checkout session completion
// `express.raw()` is used to process raw body as required by Stripe


// Export the router to be used in the main app
module.exports = router;
