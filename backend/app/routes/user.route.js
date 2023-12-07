const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/byId/:id", userController.findOne);
router.get("/byUsername/:username", userController.findByUsername);
router.get("/all", userController.findAll);
router.put("/update/:id", userController.update);
router.post("/signup", userController.create);
router.delete("/:id", userController.delete);

module.exports = router;