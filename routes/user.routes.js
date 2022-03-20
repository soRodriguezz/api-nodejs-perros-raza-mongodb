const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user.controller");

router.post("/user/", createUser);

module.exports = router;
