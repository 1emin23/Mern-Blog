const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/register", auth.registerUser);
router.post("/login", auth.loginUser);
router.post("/verify", auth.verifyToken);
router.put("/update", auth.updateUser);

module.exports = router;
