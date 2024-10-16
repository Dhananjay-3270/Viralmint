const User = require('../models/user'); // Adjust the path based on your project structure
const BlogPost = require('../models/Blog'); // Adjust the path based on your project structure
const jwt = require('jsonwebtoken');
const express = require('express');
const router = require("express").Router();


const { stripeWebhook } = require("../controller/webhook.controller")

router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);


module.exports = router;