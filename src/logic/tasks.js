function createTask(id, description) {
  return {
    id,
    description,
    completed: false,
  };
}

function addTask(tasks, description) {
  const id = generateId(tasks);
  const newTask = createTask(id, description);
  return [...tasks, newTask];
}

function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

function toggleTask(tasks, id) {
  return tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
}

// helper function to generate unique id
function generateId(tasks) {
  return tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
}

module.exports = {
  createTask,
  addTask,
  removeTask,
  toggleTask,
};
