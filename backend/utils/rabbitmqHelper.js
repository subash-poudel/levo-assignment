const amqp = require('amqplib');
const QUEUE_NAME = "calendar-events-queue"

async function connectToRabbitMq(app) {
    try {
        // amqp://test:password@<IP>:5672
        // const connection = await amqp.connect('amqp://rabbitmq:5672');
        const connection = await amqp.connect('amqp://user:password@rabbitmq:5672');
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, { durable: false });

        app.post('/send', async (req, res) => {
            const message = { text: 'Hello, RabbitMQ!' };
            channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));
            res.send('Message sent to RabbitMQ');
        });

        app.get('/receive', async (req, res) => {
            channel.consume(QUEUE_NAME, (msg) => {
                if (msg !== null) {
                    console.log(msg.content.toString());
                    channel.ack(msg);
                    res.send(`Received message: ${msg.content.toString()}`);
                }
            }, { noAck: false });
        });

    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

module.exports = connectToRabbitMq;