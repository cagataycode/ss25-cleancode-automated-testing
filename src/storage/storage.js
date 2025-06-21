const fs = require("fs").promises;
const path = require("path");

const FILE_PATH = path.join(__dirname, "tasks.json");

async function saveTasks(tasks) {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
}

async function loadTasks() {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    // if file doesn't exist, return an empty array
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

module.exports = {
  saveTasks,
  loadTasks,
};
