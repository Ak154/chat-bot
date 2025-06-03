const express = require("express");
const router = express.Router();
const { userRegister, userLogin, userInfo } = require("../controllers/users")

router.post("/registration", userRegister);
router.post("/login", userLogin);
router.post("/get-user-info-by-id", userInfo);

module.exports = router