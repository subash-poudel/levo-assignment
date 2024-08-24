const express = require("express");
const eventRouter = require("./apis/event/eventRouter");
const sequelize = require("./utils/sequelizeUtil");
const bodyParser = require("body-parser");
const errorHandlerMiddleware = require("./utils/errorHandler");
const cors = require("cors");
const connectToRabbitMq = require("./utils/rabbitmqHelper");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use(bodyParser.json());
connectToRabbitMq(app);

// routes
app.use("/event", eventRouter);
app.use(errorHandlerMiddleware);


app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
