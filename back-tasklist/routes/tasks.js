const express = require("express");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const {
  fetchTasks,
  createTasks,
  updateTask,
  deleteTasks,
} = require("../services/task");

const router = express.Router();

const loremFakerURL = "https://lorem-faker.vercel.app/api";

/* GET tasks. */
router.get("/", async function (req, res) {
  const { qty = 3 } = req.query;

  const quantity = parseInt(qty, 10);

  const dbTasks = await fetchTasks(quantity, { done: { $ne: true } });

  if (dbTasks.length === quantity) {
    return res.status(200).json({
      data: dbTasks,
    });
  }

  if (dbTasks.length < quantity) {
    const amountOfTasks = quantity - dbTasks.length;

    const { data } = await axios.get(loremFakerURL, {
      params: {
        quantity: amountOfTasks,
      },
    });

    const newTasks = data.map((title) => ({
      title,
      _id: uuidv4(),
    }));

    res.status(200).json({
      data: [...dbTasks, ...newTasks],
    });

    return await createTasks(newTasks);
  }

  return res.status(500).send("Internal Server error");
});

router.put("/", async function (req, res) {
  const { task } = req.body;

  if (task === undefined || task === null) {
    return res
      .status(400)
      .send("Task property should be defined in request body");
  }

  const response = await updateTask(task);

  res.send(response);
});

router.delete("/", async function (req, res) {
  const { filter } = req.body;

  if (filter === undefined || filter === null) {
    return res
      .status(400)
      .send("ID property should be defined in request body");
  }

  const response = await deleteTasks(filter);

  res.send(response);
});

module.exports = router;
