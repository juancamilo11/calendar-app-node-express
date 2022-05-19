const { request, response } = require("express");
const { validationResult } = require("express-validator");
const { jwtValidation } = require("../middleware/jwt-validators");
const { Router } = require("express");
const Event = require("../models/Event");

const getAllEvents = async (req = request, res = response) => {
  // const eventList = await Event.find();

  const eventList =
    (await Event.find({ user: req.uid }).populate("user")) || [];

  return res
    .json({
      ok: true,
      eventList,
    })
    .status(200);
};

const getEventById = async (req = request, res = response) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId);

  if (!event) {
    return res
      .json({
        ok: false,
        message: `No event found with id ${eventId}`,
      })
      .status(404);
  }

  if (event.user._id.toString() !== req.uid) {
    return res
      .json({
        ok: false,
        event: `You don't have permission to view this event`,
      })
      .status(401);
  }

  res
    .json({
      ok: true,
      event: event,
    })
    .status(200);
};

const registerEvent = async (req = request, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const storedEvent = await event.save();

    res
      .json({
        ok: true,
        message: "Event saved in database",
        event: storedEvent,
      })
      .status(201);
  } catch (error) {
    res
      .json({
        ok: false,
        message: "Error when trying to save event",
        error,
      })
      .status(500);
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId);

  if (!event) {
    return res
      .json({
        ok: false,
        message: `No event found with id ${eventId}`,
      })
      .status(404);
  }

  if (event.user._id.toString() !== req.uid) {
    return res
      .json({
        ok: false,
        event: `You don't have permission to update this event`,
      })
      .status(401);
  }

  const eventUpdated = { ...req.body, user: req.uid };

  const eventResult = await Event.findByIdAndUpdate(eventId, eventUpdated, {
    new: true,
  });

  res
    .json({
      ok: true,
      event: eventResult,
    })
    .status(200);
};

const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId);

  if (!event) {
    return res
      .json({
        ok: false,
        message: `No event found with id ${eventId}`,
      })
      .status(404);
  }

  if (event.user._id.toString() !== req.uid) {
    return res
      .json({
        ok: false,
        event: `You don't have permission to delete this event`,
      })
      .status(401);
  }

  await Event.findByIdAndDelete(eventId);

  res
    .json({
      ok: true,
      msg: `Event with id ${eventId} successfully deleted`,
    })
    .status(200);
};

module.exports = {
  getAllEvents,
  getEventById,
  registerEvent,
  updateEvent,
  deleteEvent,
};
