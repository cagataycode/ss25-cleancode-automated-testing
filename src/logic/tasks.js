// generate a unique ID based on existing tasks
function generateUniqueId(tasks) {
  return tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
}

// create a new task object
function createTask(id, description) {
  return {
    id,
    description,
    completed: false,
  };
}

// add a new task to the list
function addTask(tasks, description) {
  const newId = generateUniqueId(tasks);
  const newTask = createTask(newId, description);
  return [...tasks, newTask];
}

// remove a task by ID
function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// toggle the completion status of a task
function toggleTaskCompletion(tasks, taskId) {
  return tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
}

module.exports = {
  generateUniqueId,
  createTask,
  addTask,
  removeTask,
  toggleTaskCompletion,
};
