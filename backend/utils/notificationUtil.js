function getNotificationMessage(data) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

module.exports = { getNotificationMessage };
