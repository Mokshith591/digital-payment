const express = require("express");
const { getUserDetails } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", authMiddleware, getUserDetails);

module.exports = router;
