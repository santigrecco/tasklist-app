const { DBClient } = require("../db");

exports.fetchTasks = (qty, query) => {
  return DBClient.db
    .collection("tasks")
    .find(query)
    .limit(qty)
    .toArray()
    .catch((e) => res.status(500).send(e));
};

exports.createTasks = (tasks) => {
  return DBClient.db
    .collection("tasks")
    .insertMany(tasks)
    .catch((e) => res.status(500).send(e));
};

exports.updateTask = (task) => {
  return DBClient.db
    .collection("tasks")
    .updateOne({ _id: task._id }, { $set: task })
    .catch((e) => res.status(500).send(e));
};

exports.deleteTasks = (filter = {}) => {
  return DBClient.db
    .collection("tasks")
    .deleteMany(filter)
    .catch((e) => res.status(500).send(e));
};
