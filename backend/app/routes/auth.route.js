const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/disconnect", authController.disconnect);
router.get("/isConnected", authController.isConnected);

module.exports = router;