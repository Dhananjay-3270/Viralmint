const express = require('express');
const router = require("express").Router();

const { getallpost } = require("../controller/post.controller")

router.get("/:city", getallpost);


module.exports = router;
