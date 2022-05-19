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
const { isValidDate } = require("../helpers/validations/events");

const router = Router();

router.use(jwtValidation);

// Public routes
router.get("/get/events", getAllEvents);

router.get("/get/event/:id", getEventById);

// Routes bellow will be executed with no token validation

// Private routes
router.post(
  "/post/event",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Starting date must be a date value").custom(isValidDate),
    check("end", "Ending date must be a date value").custom(isValidDate),
    validateFields,
  ],
  registerEvent
);

router.put("/put/event/:id", jwtValidation, updateEvent);

router.delete("/delete/event/:id", jwtValidation, deleteEvent);

module.exports = router;
