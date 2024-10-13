const express = require('express');
const router = require("express").Router();

const {registeruser} =  require("../controller/api.controller")

router.post("/register", registeruser);


module.exports = router;
