const amqp = require("amqplib");
const { getNotificationMessage } = require("./notificationUtil");
const QUEUE_NAME = "calendar-events-queue";
const DELAY = 3 * 1_000;
const EXCHANGE = "delayed_exchange";
let channel;

// Not working urls
// const RABBITMQ_URL = 'amqp://user:password@rabbitmq:5672';
// const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
// const RABBITMQ_URL = 'amqp://localhost';
// Testing urls
// const RABBITMQ_URL = 'amqp://user:password@172.18.0.3:5672';
const RABBITMQ_URL = "amqp://user:password@172.18.0.2:5672";

// This function should be called first before sending/receiving events
async function initializeRabitMq(app) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);

    // Create a channel
    channel = await connection.createChannel();

    // Declare an exchange of type 'x-delayed-message'

    await channel.assertExchange(EXCHANGE, "x-delayed-message", {
      durable: true,
      arguments: {
        "x-delayed-type": "direct",
      },
    });

    // Declare a queue and bind it to the exchange
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE, "delayed_key");
    receiveSimpleMessageFromRabbitMq();
  } catch (error) {
    console.error("Error initializing RabbitMQ:", error);
  }
}

function sendMessageToRabbitMq(data) {
  console.log("Sending message");

  const msg = {
    event: "Calendar Event Notification",
    data: data,
  };
  channel.publish(EXCHANGE, "delayed_key", Buffer.from(JSON.stringify(msg)), {
    headers: {
      "x-delay": DELAY,
    },
  });
}

let responseCallbackFn;

function receiveSimpleMessageFromRabbitMq(res) {
  if (res) {
    console.log("Response callback function is not null.");
    responseCallbackFn = res;
  }
  console.log("Receiving message from rabbit mp");
  channel.consume(
    QUEUE_NAME,
    (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        console.log("Received message", content);
        channel.ack(msg);
        // TODO there should be a better way to do this
        if (responseCallbackFn) {
          console.log("sending response callback with data");
          responseCallbackFn.write(getNotificationMessage(JSON.parse(content)));
        } else {
          console.log("Response callback function is null.");
        }
      }
    },
    { noAck: false }
  );
}

module.exports = {
  initializeRabitMq,
  sendMessageToRabbitMq,
  receiveSimpleMessageFromRabbitMq,
};
