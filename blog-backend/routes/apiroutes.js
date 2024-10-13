const express = require('express');
const router = require("express").Router();
const authenticate = require("../middleware/auth")
const { registeruser, loginuser,getUserData } = require("../controller/api.controller")

router.post("/register", registeruser);
router.post("/login", loginuser)
router.get('/user', authenticate, getUserData)
module.exports = router;
