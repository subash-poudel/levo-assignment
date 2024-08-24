const { getNotificationMessage } = require("../../utils/notificationUtil");
const {
  receiveSimpleMessageFromRabbitMq,
} = require("../../utils/rabbitmqHelper");

function subscribeToNotifications(req, res, next) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  receiveSimpleMessageFromRabbitMq(res);
  res.write(getNotificationMessage({ message: 'Subscribed to receiving notifications.' }))
}

module.exports = {
  subscribeToNotifications,
};
