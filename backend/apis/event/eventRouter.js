const express = require("express");
const eventController = require("./eventController");
const eventRouter = express.Router();
const eventValidator = require("./eventValidator");

eventRouter.post(
  "/",
  eventValidator.createEventValidator,
  eventController.createEvent
);
eventRouter.get("/", eventController.getAllEvents);

module.exports = eventRouter;
