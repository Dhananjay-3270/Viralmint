const express = require('express');
const router = require("express").Router();
const authenticate = require("../middleware/auth")
const { registeruser, loginuser, getUserData, addblog,deleteblog } = require("../controller/api.controller")

router.post("/register", registeruser);
router.post("/login", loginuser)
router.get('/user', authenticate, getUserData)
router.post('/addblogs', authenticate, addblog)
router.delete("/delete/:id", authenticate ,deleteblog)
module.exports = router;
