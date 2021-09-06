class TaskService {
  constructor() {
    this.baseURL = "http://localhost:4000/tasks";
  }

  async fetchTasks(params) {
    try {
      const queryParams = new URLSearchParams(Object.entries(params));

      const URL = `${this.baseURL}?${queryParams.toString()}`;
      const response = await fetch(URL);
      const parsedResponse = await response.json();
      return parsedResponse.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async completeTask(task) {
    const body = JSON.stringify({
      task: {
        ...task,
        done: true,
      },
    });

    try {
      return fetch(this.baseURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCompletedTasks() {
    const body = JSON.stringify({
      filter: {
        done: true,
      },
    });

    try {
      return fetch(this.baseURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAll() {
    const body = JSON.stringify({
      filter: {},
    });

    try {
      return fetch(this.baseURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export const taskService = new TaskService();
