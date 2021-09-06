const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const tasksRouter = require("./routes/tasks");
const { DBClient } = require("./db");

const PORT = 4000;
const app = express();

DBClient.connect((err) => {
  if (err) return console.log(err);

  console.log("Connected to MongoDB");

  // DBClient.client.auth({
  //   user: "root",
  //   pwd: "pass",
  // });
});

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tasks", tasksRouter);

app.listen(PORT);

module.exports = app;
