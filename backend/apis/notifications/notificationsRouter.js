const express = require("express");
const notificationController = require("./notificationsController");
const notificationRouter = express.Router();

notificationRouter.get("/", notificationController.subscribeToNotifications);

module.exports = notificationRouter;
