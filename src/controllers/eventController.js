const { request, response } = require("express");
const { validationResult } = require("express-validator");
const { jwtValidation } = require("../middleware/jwt-validators");
const { Router } = require("express");

const getAllEvents = (req = request, res = response) => {
  res
    .json({
      ok: true,
      msg: "getAllEvents",
    })
    .status(200);
};

const getEventById = (req = request, res = response) => {
  res
    .json({
      ok: true,
      msg: "getEventById",
    })
    .status(200);
};

const registerEvent = (req = request, res = response) => {
  res
    .json({
      ok: true,
      msg: "registerEvent",
    })
    .status(200);
};

const updateEvent = (req = request, res = response) => {
  res
    .json({
      ok: true,
      msg: "updateEvent",
    })
    .status(200);
};

const deleteEvent = (req = request, res = response) => {
  res
    .json({
      ok: true,
      msg: "deleteEvent",
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
