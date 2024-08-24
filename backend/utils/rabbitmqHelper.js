const amqp = require("amqplib");
const QUEUE_NAME = "calendar-events-queue";
const DELAY = 10 * 1_000;
const EXCHANGE = 'delayed_exchange';
let channel;

// Not working urls
// const RABBITMQ_URL = 'amqp://user:password@rabbitmq:5672';
// const RABBITMQ_URL = 'amqp://user:password@localhost:5672';
// const RABBITMQ_URL = 'amqp://localhost';
// Testing urls
// const RABBITMQ_URL = 'amqp://user:password@172.18.0.3:5672';
const RABBITMQ_URL = 'amqp://user:password@172.18.0.2:5672';

// This function should be called first before sending/receiving events
async function initializeRabitMq(app) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });
    // attach receive listener
    receiveSimpleMessageFromRabbitMq()
  } catch (error) {
    console.error("Error initializing RabbitMQ:", error);
  }
}

function sendMessageToRabbitMq(data) {
  console.log("Sending message");
  const currentDate = new Date();

  const msg = {
    event: "exampleEvent",
    timestamp: new Date(currentDate.getUTCMilliseconds() + DELAY * 1000 * 10).toISOString(),
    data: data,
  };
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(msg)));
}

function receiveSimpleMessageFromRabbitMq() {
  console.log("Receiving message from rabbit mp");
  channel.consume(
    QUEUE_NAME,
    (msg) => {
      if (msg !== null) {
        console.log('Received message', msg.content.toString());
        channel.ack(msg);
      }
    },
    { noAck: false }
  );
}

async function connectToRabbitMQ() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(RABBITMQ_URL);

    // Create a channel
    channel = await connection.createChannel();

    // Declare an exchange of type 'x-delayed-message'

    await channel.assertExchange(EXCHANGE, 'x-delayed-message', {
      durable: true,
      arguments: {
        'x-delayed-type': 'direct'
      }
    });

    // Declare a queue and bind it to the exchange
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE, 'delayed_key');

    
    // Send a delayed message
    const message = 'This is a delayed message';
    const delay = 1000 * 10; // 5 seconds delay

    channel.publish(EXCHANGE, 'delayed_key', Buffer.from(message), {
      headers: {
        'x-delay': delay
      }
    });

    console.log(`Sent: ${message} with ${delay}ms delay`);

    // Consume messages from the queue
    channel.consume(QUEUE_NAME, (msg) => {
      if (msg !== null) {
        console.log(`Received: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });

  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

module.exports = {
  initializeRabitMq,
  sendMessageToRabbitMq,
  receiveSimpleMessageFromRabbitMq,
  connectToRabbitMQ,
};
