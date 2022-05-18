/**
 * Events routes / Events
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middleware/field-validators");
const { jwtValidation } = require("../middleware/jwt-validators");
const {
  getAllEvents,
  getEventById,
  registerEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = Router();

// Get all events
router.get("/get/events", jwtValidation, getAllEvents);

router.get("/get/event/:id", jwtValidation, getEventById);

router.post("/post/event", jwtValidation, registerEvent);

router.put("/put/event/:id", jwtValidation, updateEvent);

router.delete("/delete/event/:id", jwtValidation, deleteEvent);

module.exports = router;
