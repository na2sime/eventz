const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/byId", userController.findOne);
router.get("/byUsername", userController.findByUsername);
router.get("/all", userController.findAll);
router.put("/update", userController.update);
router.post("/signup", userController.createUserInstance);
router.delete("/", userController.delete);

module.exports = router;