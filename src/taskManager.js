const { addTask, removeTask, toggleTaskCompletion } = require("./logic/tasks");

function createTaskManager(storage) {
  // storage should have loadTasks() and saveTasks(tasks)

  async function getTasks() {
    return await storage.loadTasks();
  }

  async function addNewTask(description) {
    const tasks = await storage.loadTasks();
    const updatedTasks = addTask(tasks, description);
    await storage.saveTasks(updatedTasks);
    return updatedTasks;
  }

  async function removeTaskById(taskId) {
    const tasks = await storage.loadTasks();
    const updatedTasks = removeTask(tasks, taskId);
    await storage.saveTasks(updatedTasks);
    return updatedTasks;
  }

  async function toggleTask(taskId) {
    const tasks = await storage.loadTasks();
    const updatedTasks = toggleTaskCompletion(tasks, taskId);
    await storage.saveTasks(updatedTasks);
    return updatedTasks;
  }

  return {
    getTasks,
    addNewTask,
    removeTaskById,
    toggleTask,
  };
}

module.exports = createTaskManager;
