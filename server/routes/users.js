const express = require("express");
const router = express.Router();
const { userRegister, userLogin } = require("../controllers/users")

router.post("/registration", userRegister)
router.post("/login", userLogin)

module.exports = router