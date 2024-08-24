const amqp = require("amqplib");
const QUEUE_NAME = "calendar-events-queue";
const DELAY = 10 * 1_000;
let channel;

// This function should be called first before sending/receiving events
async function initializeRabitMq(app) {
  try {
    const connection = await amqp.connect("amqp://user:password@rabbitmq:5672");
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


async function connectToRabbitMq(app) {
  try {
    const connection = await amqp.connect("amqp://user:password@rabbitmq:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: false });

    app.post("/send", async (req, res) => {
      console.log("rabbit mq send api called");
      const message = { text: "Hello, RabbitMQ!" };
      channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
      res.send("Message sent to RabbitMQ successfully.");
    });

    app.get("/receive", async (req, res) => {
      console.log("receive api called");
      channel.consume(
        QUEUE_NAME,
        (msg) => {
          if (msg !== null) {
            console.log(msg.content.toString());
            channel.ack(msg);
            res.send(`Received message: ${msg.content.toString()}`);
          }
        },
        { noAck: false }
      );
    });
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

module.exports = {
  initializeRabitMq,
  sendMessageToRabbitMq,
  receiveSimpleMessageFromRabbitMq,
};
