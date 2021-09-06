import { useEffect, useState } from "react";
import { taskService } from "../../services/Task";
import { Spinner } from "../Spinner/Spinner";
import { Task } from "../Task/Task";
import "./TasksList.scss";

export function TasksList() {
  const [tasksNumber, setTasksNumber] = useState(3);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTasks() {
    setIsLoading(true);
    const tasks = await taskService.fetchTasks({ qty: tasksNumber });
    setTasks(tasks);
    setIsLoading(false);
  }

  async function deleteCompletedTasks() {
    await taskService.deleteCompletedTasks();
  }

  async function deleteAllTasks() {
    setIsLoading(true);
    await taskService.deleteAll();
    fetchTasks();
    setIsLoading(false);
  }

  function handleTasksNumberChange(e) {
    const tasksNumber = parseInt(e.target.value, 10);
    if (tasksNumber > 0) {
      return setTasksNumber(tasksNumber);
    }

    setTasksNumber(1);
  }

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const tasks = await taskService.fetchTasks({ qty: 3 });
      setTasks(tasks);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="tasks-container">
      <div className="search-bar">
        <input
          className="tasks-number"
          type="number"
          value={tasksNumber}
          onChange={(e) => setTasksNumber(e.target.value)}
          onBlur={handleTasksNumberChange}
        />
        <button className="action-button" onClick={fetchTasks}>
          Fetch tasks
        </button>
        <button className="action-button" onClick={deleteCompletedTasks}>
          Delete Completed
        </button>
        <button className="action-button" onClick={deleteAllTasks}>
          Delete All
        </button>
      </div>

      <Spinner isLoading={isLoading}>
        <div className="tasks-grid">
          {tasks.map((task) => (
            <Task task={task} key={task._id} onComplete={() => fetchTasks()} />
          ))}
        </div>
      </Spinner>
    </div>
  );
}
