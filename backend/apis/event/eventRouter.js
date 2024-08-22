const express = require("express");
const eventController = require("./eventController");
const eventRouter = express.Router();
const eventValidator = require("./eventValidator");
/**
 * GET /api/users
 */
eventRouter.post(
  "/",
  eventValidator.createEventValidator,
  eventController.createEvent
);

// /**
//  * GET /api/users/:id
//  */
// eventRouter.get("/:id", eventController.test);

// /**
//  * POST /api/users
//  */
// eventRouter.put("/:id", eventController.test);

module.exports = eventRouter;
