const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

// Set up a Sequelize instance
const sequelize = new Sequelize("postgres", "postgres", "password", {
  host: "db",
  dialect: "postgres",
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Basic route
app.get("/", (req, res) => {
  console.log("get request called");
  res.send("Hello World this is a test and new test oho lols 3!");
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
