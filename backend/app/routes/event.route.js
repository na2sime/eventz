const express = require("express");
const router = express.Router();
const eventController = require("../controllers/events.controller");

const multer = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const corsMiddleware = require("../middlewares/cors.middleware");
const imageResizer = require("../middlewares/imageResizer.middleware");

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", authMiddleware, multer, imageResizer, eventController.createEvent);
router.put("/:id", authMiddleware, multer, imageResizer, eventController.updateEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;